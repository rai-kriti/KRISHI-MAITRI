import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#2E7D32] px-6 py-4 flex items-center justify-between">
      
      {/* LEFT: Logo + App Name */}
      <div className="flex items-center gap-3 text-white">
        {/* Logo: svg / png / ico — jo best ho */}
        <img
          src="/logo.svg"
          alt="Krishi Maitri"
          className="h-10 w-10 object-contain"
        />

        <span className="text-xl font-semibold tracking-wide">
          KRISHI MAITRI
        </span>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">
        
        {/* Profile */}
        <button
          onClick={() =>
            navigate("/profile", { state: { fromDashboard: true } })
          }
          className="flex items-center gap-2 px-4 py-2
                     rounded-lg bg-white text-[#2E7D32]
                     hover:bg-gray-100 transition
                     text-sm font-medium"
        >
          <FaUser />
          <span className="hidden sm:inline">Profile</span>
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/auth");
          }}
          className="flex items-center gap-2 px-4 py-2
                     rounded-lg bg-white/20 text-white
                     hover:bg-white/30 transition
                     text-sm font-medium"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
