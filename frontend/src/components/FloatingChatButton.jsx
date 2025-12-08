import { useNavigate } from "react-router-dom";

export default function FloatingChatButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chatbot")}
      className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white 
                 shadow-xl rounded-full w-16 h-16 flex items-center justify-center 
                 text-3xl transition-all"
    >
      🤖
    </button>
  );
}
