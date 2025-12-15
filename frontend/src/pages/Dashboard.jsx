import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingChatButton from "../components/FloatingChatButton";
import MSPWidget from "../components/widgets/MSPWidget";
import { isLoggedIn } from "../utils/auth";
import { logout } from "../utils/auth"; 
export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  },[]);

  return (
    <div className="p-6 bg-[#F5F1EB] min-h-screen">
      
      <button
  onClick={() => {
    logout();
    navigate("/auth");
  }}
  className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm"
>
  Logout
</button>


      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AI Assistant Widget */}
        <div
          onClick={() => navigate("/chatbot",{state: { fromdashboard :true }})}
          className="cursor-pointer bg-[#4B5D4A] text-white rounded-2xl p-5 shadow-sm
                     hover:opacity-90 transition"
        >
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <p className="text-sm opacity-90">Ask Krishi Saathi</p>
        </div>

        {/* MSP Widget */}
        <MSPWidget />

      </div>

      {/* Floating Chat */}
      <FloatingChatButton />
    </div>
  );
}
