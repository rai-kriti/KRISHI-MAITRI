import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MSPHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-white/60 transition text-2xl"
        aria-label="Go back"
      >
        <ArrowLeft />
      </button>

      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Minimum Support Prices (MSP)
        </h1>
        <p className="text-sm text-gray-600">
          Government announced prices for agricultural commodities
        </p>
      </div>
    </div>
  );
}
