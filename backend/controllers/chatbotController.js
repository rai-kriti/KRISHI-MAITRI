require("dotenv").config();
const Groq = require("groq-sdk");
const ChatLog = require("../models/ChatLog");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// configuration
const MODEL = "llama-3.1-8b-instant"; 
const CONTEXT_MESSAGES = 8;

// detect Hindi vs English
function detectLanguage(text) {
  return /[\u0900-\u097F]/.test(text) ? "hi" : "en";
}

async function getHistory(req, res) {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });

    const log = await ChatLog.findOne({ sessionId }).lean();
    res.json({ history: log ? log.messages : [] });
  } catch (err) {
    console.error("History error:", err);
    res.status(500).json({ error: "Failed to load history" });
  }
}

async function askChatbot(req, res) {
  try {
    const { query, sessionId: incomingSessionId } = req.body;
    if (!query) return res.status(400).json({ error: "query is required" });

    // generate or reuse session id
    const sessionId =
      incomingSessionId ||
      `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // get/create chat log
    let log = await ChatLog.findOne({ sessionId });
    if (!log) log = new ChatLog({ sessionId, messages: [] });

    // save user message
    log.messages.push({ role: "user", text: query });
    await log.save();

    // context messages
    const recent = log.messages.slice(-CONTEXT_MESSAGES);

    const lang = detectLanguage(query);
    const systemPrompt =
      lang === "hi"
        ? "आप कृषि सहायक AI हो। किसान के प्रश्नों का सरल और उपयोगी कृषि सलाह हिंदी में दो।"
        : "You are Krishi Saathi, an AI assistant for Indian farmers. Provide practical farming advice.";

    const chatInputs = [
      { role: "system", content: systemPrompt },
      ...recent.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    // groq call
    const result = await client.chat.completions.create({
      model: MODEL,
      messages: chatInputs,
      temperature: 0.3,
    });

    const answer =
      result.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    // save bot message
    log.messages.push({ role: "bot", text: answer });
    await log.save();

    res.json({ answer, sessionId, language: lang });
  } catch (err) {
    console.error("Chatbot Error:", err);
    res.status(500).json({ error: "Chatbot failed" });
  }
}

module.exports = { askChatbot, getHistory };
