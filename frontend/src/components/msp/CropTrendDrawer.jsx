import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

export default function CropTrendDrawer({ crop, trend, onClose }) {
  if (!crop || !trend || trend.length === 0) return null;

  // ---- INSIGHTS (REAL DATA ONLY) ----
  const latest = trend[trend.length - 1];
  const previous = trend[trend.length - 2];

  const diff = previous ? latest.msp - previous.msp : 0;
  const percent = previous ? ((diff / previous.msp) * 100).toFixed(1) : 0;

  const isUp = diff > 0;
  const isDown = diff < 0;

  const maxMSP = Math.max(...trend.map(t => t.msp));
  const minMSP = Math.min(...trend.map(t => t.msp));

  return (
    <motion.div
      initial={{ y: 420 }}
      animate={{ y: 0 }}
      exit={{ y: 420 }}
      transition={{ type: "spring", damping: 22 }}
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white rounded-t-3xl
        p-5 shadow-2xl
      "
    >
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight">
            {crop.displayName}
          </h3>
          <p className="text-xs text-gray-500">
            MSP trend over years
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* ---------- HERO STATS (MOBILE FIRST) ---------- */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-gray-500">Current</p>
          <p className="font-semibold text-base">
            ₹{latest.msp}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-gray-500">YoY Change</p>
          <p
            className={`font-semibold text-base ${
              isUp
                ? "text-green-600"
                : isDown
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {isUp && "▲ "}
            {isDown && "▼ "}
            {percent}%
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-gray-500">Range</p>
          <p className="font-semibold text-xs">
            ₹{minMSP} – ₹{maxMSP}
          </p>
        </div>
      </div>

      {/* ---------- TREND CHART ---------- */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={trend}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10 }}
            tickMargin={6}
          />
          <Tooltip
            formatter={(value) => [`₹${value}`, "MSP"]}
            labelStyle={{ fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="msp"
            stroke={
              isUp
                ? "#16A34A"
                : isDown
                ? "#DC2626"
                : "#6B7280"
            }
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* ---------- CONTEXT NOTE ---------- */}
      <p className="text-[11px] text-gray-500 mt-3 text-center">
        Prices are government-declared MSP values (₹/quintal)
      </p>
    </motion.div>
  );
}
