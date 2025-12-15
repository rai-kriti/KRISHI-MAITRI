import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm text-center text-white"
      >
        <h1 className="text-3xl font-semibold leading-tight mb-4">
          Krishi Maitri
        </h1>

        <p className="text-sm opacity-90 mb-8">
          Smart farming support for better crop decisions.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="w-full py-3 rounded-2xl bg-emerald-400 text-green-900 font-medium active:scale-95 transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
