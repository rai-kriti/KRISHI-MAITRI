import { motion } from "framer-motion";

export default function MSPCropList({ crops }) {
  return (
    <div className="space-y-3">
      {crops.map(crop => (
        <motion.div
          key={`${crop.crop}-${crop.season}`}
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm"
        >
          <div>
            <p className="font-medium">{crop.displayName}</p>
            <p className="text-xs text-gray-500">
              {crop.season} • {crop.year}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">₹{crop.msp}</p>
            <span className="text-xs text-green-600">▲ MSP</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
