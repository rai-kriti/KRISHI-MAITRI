import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CropList({ crops, onSelect }) {
  const [changes, setChanges] = useState({});

  useEffect(() => {
    async function fetchChanges() {
      const result = {};

      for (let crop of crops) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/msp/${crop.season}/${crop.crop}`
          );

          const trend = res.data.data;

          if (trend.length >= 2) {
            const last = trend[trend.length - 1];
            const prev = trend[trend.length - 2];

            const diff = last.msp - prev.msp;
            const percent = ((diff / prev.msp) * 100).toFixed(1);

            result[crop.crop] = {
              diff,
              percent
            };
          }
        } catch (e) {
          console.error("Trend fetch failed", crop.crop);
        }
      }

      setChanges(result);
    }

    fetchChanges();
  }, [crops]);

  return (
    <div className="space-y-3">
      {crops.map(crop => {
        const change = changes[crop.crop];

        const isUp = change?.diff > 0;
        const isDown = change?.diff < 0;

        return (
          <motion.div
            key={`${crop.crop}-${crop.season}`}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelect(crop)}
            className="cursor-pointer bg-white rounded-xl p-4
                       flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-medium">{crop.displayName}</p>
              <p className="text-xs text-gray-500">
                {crop.season} • {crop.year}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{crop.msp}</p>

              {change ? (
                <span
                  className={`text-xs font-medium ${
                    isUp
                      ? "text-green-600"
                      : isDown
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {isUp && "▲"}
                  {isDown && "▼"} {change.percent}%
                </span>
              ) : (
                <span className="text-xs text-gray-400">—</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
