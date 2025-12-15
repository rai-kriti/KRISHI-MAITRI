import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const CATEGORY_MAP = {
  grains: {
    label: "🌾 Grains",
    crops: ["wheat", "paddy", "maize", "jowar", "bajra", "ragi"]
  },
  pulses: {
    label: "🫘 Pulses",
    crops: ["gram", "arhar", "tur", "moong", "urad", "masur"]
  },
  oilseeds: {
    label: "🌻 Oilseeds",
    crops: ["groundnut", "soyabean", "sunflower", "sesamum", "nigerseed", "safflower"]
  }
};

const GRADIENTS = [
  "from-blue-600 to-cyan-600",        // calm govt blue
  "from-teal-600 to-cyan-600",        // irrigation / water
  "from-sky-600 to-blue-500",         // open sky + farming
  "from-emerald-600 to-teal-500"      // keep 1 green for agri balance
];

export default function HeroMSPCarousel({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-8 mb-12">
      {Object.values(CATEGORY_MAP).map(category => {
        const crops = data.filter(d =>
          category.crops.some(c => d.crop.toLowerCase().includes(c))
        );

        if (crops.length === 0) return null;

        const sorted = [...crops].sort((a, b) => b.msp - a.msp);

        return (
          <SingleAutoCard
            key={category.label}
            label={category.label}
            crops={sorted}
          />
        );
      })}
    </div>
  );
}


  function SingleAutoCard({ label, crops }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [crops]);

  useEffect(() => {
    if (!crops || crops.length === 0) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % crops.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [crops]);

  const crop = crops[index] || crops[0];
  const gradient = GRADIENTS[index % GRADIENTS.length];

  if (!crop) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3">{label}</h3>

      <div className="relative h-[140px]">
        <motion.div
  className={`
    bg-gradient-to-br ${gradient}
    text-white rounded-3xl p-5 md:p-6 shadow-lg
    flex flex-col md:flex-row
    md:items-center md:justify-between
    gap-3
    overflow-hidden
  `}
>
  {/* CROP NAME */}
  <div className="md:max-w-[65%]">
    <p className="
      text-2xl sm:text-3xl md:text-4xl
      font-semibold leading-tight break-words
    ">
      {crop.displayName}
    </p>
  </div>

  {/* PRICE + YEAR */}
  <div className="
    flex items-center justify-between
    md:block md:text-right
    text-sm
  ">
    <p className="text-xs opacity-90">
      {crop.year}
    </p>

    <p className="text-xl sm:text-2xl font-bold leading-tight">
      ₹{crop.msp}
      <span className="text-sm font-normal"> / qtl</span>
    </p>
  </div>
</motion.div>

      </div>
    </div>
  );

  }