import { useState, useEffect, useRef } from "react";
import api from "../../utils/api";

export default function ChatbotWidget({ fullScreen = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const chatRef = useRef(null);

  // session id
  const [sessionId, setSessionId] = useState(() => {
    let sid = localStorage.getItem("krishi_session");
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem("krishi_session", sid);
    }
    return sid;
  });

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setListening(false);

    const newSession = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setSessionId(newSession);
    localStorage.setItem("krishi_session", newSession);
  };

  // load history
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await api.get(`/api/chatbot/history/${sessionId}`);
        if (res.data?.history) {
          setMessages(
            res.data.history.map((m) => ({
              role: m.role,
              text: m.text,
            }))
          );
        }
      } catch {
        // silent
      }
    }
    loadHistory();
  }, [sessionId]);

  // auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const formatMessage = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/__/g, "")
      .replace(/_/g, "")
      .replace(/\n\d+\.\s/g, "\n• ")
      .replace(/\n-\s/g, "\n• ")
      .replace(/\n/g, "<br/>");
  };

  const sendMessage = async (textToSend = null) => {
    const text = textToSend ?? input;
    if (!text.trim()) return;

    setMessages((p) => [...p, { role: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const res = await api.post("/api/chatbot/ask", {
        query: text,
        sessionId,
      });

      setMessages((p) => [
        ...p,
        {
          role: "bot",
          text: res.data?.answer || "Sorry, I couldn't answer that.",
        },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "bot", text: "Session expired. Please login again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Voice not supported");

    const recog = new SpeechRecognition();
    recog.lang = "hi-IN";
    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);
    recog.onerror = () => setListening(false);
    recog.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      sendMessage(spoken);
    };
    recog.start();
  };

  return (
    <div
      className={`${
        fullScreen
          ? "p-0 bg-transparent h-full"
          : "bg-white p-4 rounded-xl shadow max-w-2xl mx-auto"
      }`}
    >
      {!fullScreen && (
        <div className="flex justify-between mb-3">
          <h2 className="text-xl font-semibold text-green-700">
            🌱 Krishi Saathi
          </h2>
          <button
            onClick={clearChat}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Clear
          </button>
        </div>
      )}

      <div
        ref={chatRef}
        className="h-[70vh] overflow-y-auto bg-[#f8f5ef] p-4 rounded-xl"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-sm max-w-[80%] ${
                m.role === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
              dangerouslySetInnerHTML={{ __html: formatMessage(m.text) }}
            />
          </div>
        ))}

        {typing && <p className="text-sm text-gray-500">Typing…</p>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={startListening}
          className={`w-10 h-10 rounded ${
            listening ? "bg-red-400" : "bg-green-200"
          }`}
        >
          🎙️
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask about crops, soil, fertilizer…"
        />

        <button
          onClick={() => sendMessage()}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
