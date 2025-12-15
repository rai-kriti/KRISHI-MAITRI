import { motion } from "framer-motion";

export default function SeasonSwitch({ season, setSeason }) {
  return (
    <div className="bg-yellow-100 rounded-full p-1 flex mb-5">
      {["kharif", "rabi"].map(s => (
        <motion.button
          key={s}
          type="button"
          layout
          onClick={() => setSeason(s)}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition
            ${season === s
              ? "bg-orange-500 text-white shadow"
              : "text-gray-700"}`}
        >
          {s === "kharif" ? "🌾 Kharif " : "🌿 Rabi "}
        </motion.button>
      ))}
    </div>
  );
}
