import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";
import { useState } from "react";

export default function TopCropsBarChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const top = [...data]
    .sort((a, b) => b.msp - a.msp)
    .slice(0, 6);

 const colors = [
  "#14532D", // top 1 – deep forest green (highest MSP)
  "#166534", // top 2 – strong leaf green
  "#15803D", // top 3 – crop green
  "#16A34A", // healthy field green
  "#4ADE80", // light fresh green
  "#86EFAC"  // soft mint green
];


  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">
      <h3 className="font-semibold mb-4 text-gray-800">
        🌾 Top MSP Crops (at a glance)
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={top}
          layout="vertical"
          margin={{ left: 10, right: 30 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="displayName"
            width={110}
            tick={{ fontSize: 12, fill: "#444" }}
          />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            formatter={(value) => [`₹${value}`, "MSP"]}
          />

          <Bar
            dataKey="msp"
            radius={[0, 12, 12, 0]}
            onClick={(_, index) => setActiveIndex(index)}
          >
            {top.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index]}
                opacity={
                  activeIndex === null || activeIndex === index
                    ? 1
                    : 0.5
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Mobile hint */}
      <p className="text-xs text-gray-500 mt-2">
        Tap a bar to focus • Longer bar = higher MSP
      </p>
    </div>
  );
}
