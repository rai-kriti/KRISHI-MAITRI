import { useNavigate } from "react-router-dom";
import FloatingChatButton from "../components/FloatingChatButton";


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div
        onClick={() => navigate("/chatbot")}
        className="cursor-pointer bg-green-600 text-white rounded-xl p-4 shadow"
      >
        <h2 className="text-xl font-semibold">AI Assistant</h2>
        <p>Ask Krishi Saathi</p>
      </div>
        <FloatingChatButton />
    </div>
  );
}
