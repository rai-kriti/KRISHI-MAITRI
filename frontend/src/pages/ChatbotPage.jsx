import { useNavigate } from "react-router-dom";
import ChatbotWidget from "../components/widgets/ChatbotWidget";

export default function ChatbotPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f3ec] flex flex-col">

      {/* HEADER */}
      <div className="bg-green-700 text-white p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-semibold">Krishi Saathi</h1>
      </div>

      {/* CHATBOT */}
      <div className="flex-1 p-4">
        <ChatbotWidget fullScreen={true} />
      </div>
    </div>
  );
}
