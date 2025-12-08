import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatbotWidget({ fullScreen = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const chatRef = useRef(null);

  // Generate OR load sessionId stored in localStorage
  const [sessionId, setSessionId] = useState(() => {
    let sid = localStorage.getItem("krishi_session");
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem("krishi_session", sid);
    }
    return sid;
  });

  // --- CLEAR CHAT ---
  const clearChat = () => {
    setMessages([]);
    setInput("");
    setListening(false);

    const newSession = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setSessionId(newSession);
    localStorage.setItem("krishi_session", newSession);
  };

  // load previous chat history
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chatbot/history/${sessionId}`
        );
        if (res.data?.history) {
          setMessages(res.data.history.map((m) => ({ role: m.role, text: m.text })));
        }
      } catch {}
    }
    loadHistory();
  }, [sessionId]);

  // auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Clean markdown formatting
  function formatMessage(text) {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/__/g, "")
      .replace(/_/g, "")
      .replace(/\n\d+\.\s/g, "\n• ")
      .replace(/\n-\s/g, "\n• ")
      .replace(/\n/g, "<br/>");
  }

  // --- SEND MESSAGE ---
  const sendMessage = async (textToSend = null) => {
    const text = textToSend ?? input;
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/ask", {
        query: text,
        sessionId,
      });

      const botMsg = {
        role: "bot",
        text: res.data?.answer || "Sorry, I couldn't answer that.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error. Try again later." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  // --- VOICE INPUT ---
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported on this browser.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "hi-IN";
    recog.interimResults = false;

    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);

    recog.onerror = () => setListening(false);

    recog.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      setInput(spoken);
      sendMessage(spoken);
    };

    try {
      recog.start();
    } catch {}
  };
  // --- Handle image selection ---
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show user image message preview
  const imgMsg = {
    role: "user",
    text: "(Image Uploaded)",
    image: URL.createObjectURL(file),
  };

  setMessages((prev) => [...prev, imgMsg]);
  setTyping(true);

  // Send image to backend
 // Send image to backend (updated for LLaVA)
const formData = new FormData();
formData.append("image", file);   // image file for upload

try {
  const res = await axios.post(
    "http://localhost:5000/api/image/analyze",   // <-- NEW ROUTE
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  const botMsg = {
    role: "bot",
    text: res.data.diagnosis || "Could not diagnose the image.",
  };

  setMessages(prev => [...prev, botMsg]);

} catch (err) {
  setMessages(prev => [
    ...prev,
    { role: "bot", text: "Image detection failed. Try again." }
  ]);
}


  setTyping(false);
};



  return (
    <div
      className={`${
        fullScreen
          ? "p-0 bg-transparent shadow-none h-full"
          : "bg-white p-4 rounded-xl shadow w-full max-w-2xl mx-auto"
      }`}
    >
      {/* HEADER WITH CLEAR BUTTON */}
      {!fullScreen && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-700 flex items-center gap-2">
            🌱 Krishi Saathi Chatbot
          </h2>

          <button
            onClick={clearChat}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
          >
            Clear
          </button>
        </div>
      )}

      {/* CHAT AREA */}
      <div
        ref={chatRef}
        className="h-[70vh] overflow-y-auto border border-green-200 p-4 rounded-xl bg-[#f8f5ef] shadow-inner"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-3 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow 
                ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-green-200 rounded-bl-none"
                }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formatMessage(msg.text),
                }}
              />
              
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "120ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "240ms" }}
            />
          </div>
        )}
      </div>

      {/* INPUT BAR */}
      {/* INPUT BAR */}
<div className="mt-4 flex items-center bg-white border border-green-300 rounded-xl overflow-hidden shadow p-2">

  <button
    onClick={startListening}
    className={`w-12 h-12 rounded-lg mr-2 flex items-center justify-center ${
      listening ? "bg-red-400" : "bg-green-100"
    }`}
    title="Voice Input"
  >
    {listening ? "●" : "🎙️"}
  </button>

  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    className="flex-1 px-4 py-2 outline-none text-gray-700"
    placeholder="Ask about crops, soil, fertilizers…"
  />


  {/* SMALL CLEAR BUTTON */}
  <button
    onClick={clearChat}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm mx-2"
  >
    Clear
  </button>

  <button
    onClick={() => sendMessage()}
    disabled={typing}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
  >
    Send
  </button>
</div>

    </div>
  );
}
