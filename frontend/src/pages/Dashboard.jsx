import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/header/DashboardHeader";
import ProfileWidget from "../components/widgets/ProfileWidget";
import MSPWidget from "../components/widgets/MSPWidget";
import GovtSchemesWidget from "../components/widgets/GovtSchemesWidget";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Farmer";

  return (
    <div className="min-h-screen bg-[#F5F1EB] font-round">

      {/* HEADER */}
      <DashboardHeader />

      {/* CONTENT */}
      <div className="pt-28 px-6 max-w-7xl mx-auto">

        {/* ================= WELCOME SECTION ================= */}
        <div className="mb-10 relative overflow-hidden rounded-3xl
                        bg-gradient-to-r from-green-100 via-green-50 to-white
                        p-8 shadow-sm">
          
          {/* soft cloud blur */}
          <div className="absolute -top-10 -left-10 h-40 w-40 bg-white/60 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 h-32 w-32 bg-white/50 rounded-full blur-2xl" />

          <h1 className="text-3xl md:text-4xl font-semibold text-[#2F3E2E]">
            Welcome back, {userName} 🌱
          </h1>
          <p className="mt-2 text-gray-600 max-w-xl">
            Your personal farming dashboard — schemes, prices,
            crop advice and support, all in one place.
          </p>
        </div>

        {/* ================= PROFILE ================= */}
        <div className="mb-8">
          <ProfileWidget />
        </div>

        {/* ================= CHATBOT + WEATHER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Chatbot */}
          <div
            onClick={() =>
              navigate("/chatbot", { state: { fromDashboard: true } })
            }
            className="md:col-span-1 cursor-pointer bg-[#4B5D4A]
                       text-white rounded-3xl p-6 shadow
                       hover:opacity-90 transition"
          >
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <p className="text-sm opacity-90 mt-1">
              Ask Krishi Saathi
            </p>
          </div>

          {/* Weather (placeholder) */}
          <div className="md:col-span-2 rounded-3xl border-2 border-dashed
                          border-gray-300 bg-white/60 p-6
                          flex items-center justify-center text-gray-400">
            Weather widget (coming soon)
          </div>
        </div>

        {/* ================= MSP + CROP TIPS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* MSP */}
          <div className="md:col-span-2">
            <MSPWidget />
          </div>

          {/* Crop & Fertilizer Tips (placeholder tall) */}
          <div className="rounded-3xl border-2 border-dashed
                          border-gray-300 bg-white/60 p-6
                          flex items-center justify-center text-gray-400
                          min-h-[260px]">
            Crop & Fertilizer Tips (coming soon)
          </div>
        </div>

        {/* ================= SCHEMES ================= */}
        <div className="mb-12">
          <GovtSchemesWidget />
        </div>

      </div>
    </div>
  );
}
