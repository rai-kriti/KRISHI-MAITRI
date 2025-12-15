import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MSPWidget = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/msp/widget")
      .then(res => setData(res.data.data.slice(0, 4)));
  }, []);

  return (
    <motion.div
       onClick={() =>
        navigate("/msp", { state: { fromDashboard: true } })
      }
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="cursor-pointer bg-[#FFF9EC] border border-[#E8D8B8]
                 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">📊</span>
        <h2 className="text-xl font-semibold text-[#3E4A3C]">
          Minimum Support Prices (MSP)
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-[#6B705C] mb-5 max-w-md">
        View government-announced MSP rates for Kharif & Rabi crops with
        year-wise trends.
      </p>

      {/* MSP Chips */}
      <div className="flex flex-wrap gap-3">
        {data.map(item => (
          <div
            key={`${item.crop}-${item.season}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-[#FFF1D6] text-[#5C3B00] text-sm font-medium"
          >
            <span>🌾</span>
            <span>{item.displayName}</span>
            <span className="font-semibold">₹{item.msp}</span>
          </div>
        ))}

        {/* Trend Hint */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-[#E6F4EA] text-[#1E6F3D] text-sm font-medium"
        >
          📈 Year Trends
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6">
        <span className="text-xs text-[#7A7A7A]">
          Source: Government of India
        </span>
      </div>
    </motion.div>
  );
};

export default MSPWidget;
