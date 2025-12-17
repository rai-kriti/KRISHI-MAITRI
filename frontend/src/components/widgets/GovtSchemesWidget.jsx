import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaRupeeSign,
  FaShieldAlt,
  FaSeedling,
  FaTractor,
} from "react-icons/fa";

const FILTERS = [
  {
    label: "Income Support",
    category: "income",
    icon: FaRupeeSign,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Crop Insurance",
    category: "insurance",
    icon: FaShieldAlt,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Soil Health",
    category: "soil",
    icon: FaSeedling,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Equipment Subsidy",
    category: "equipment",
    icon: FaTractor,
    color: "bg-orange-100 text-orange-700",
  },
];

export default function GovtSchemesWidget() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeFilter) return;

    setLoading(true);

    axios
      .get(
        `http://localhost:5000/api/discover/schemes`,
        {
          params: { category: activeFilter.category },
          withCredentials: true,
        }
      )
      .then((res) => setSchemes(res.data.schemes || []))
      .finally(() => setLoading(false));
  }, [activeFilter]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          ✨ Government Schemes
        </h3>

        <button
          onClick={() => navigate("/schemes")}
          className="text-green-700 text-sm font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-[#FFF7E6] rounded-xl px-4 py-3 text-sm text-gray-700 mb-6">
        Explore government schemes for farmers including income support,
        crop insurance, soil health and subsidies.
      </div>

      {/* FILTER TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {FILTERS.map((f) => (
          <div
            key={f.category}
            onClick={() => setActiveFilter(f)}
            className={`cursor-pointer border rounded-xl p-4
                        flex flex-col items-center gap-3 transition
                        ${
                          activeFilter?.category === f.category
                            ? "border-green-600 shadow-md"
                            : "hover:shadow-md"
                        }`}
          >
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${f.color}`}
            >
              <f.icon size={20} />
            </div>

            <p className="text-sm font-medium text-center">
              {f.label}
            </p>
          </div>
        ))}
      </div>

      {/* FILTERED PREVIEW */}
      {activeFilter && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-700">
            Matching schemes
          </h4>

          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : schemes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No schemes found
            </p>
          ) : (
            <ul className="space-y-2">
              {schemes.slice(0, 3).map((s) => (
                <li
                  key={s.schemeId}
                  className="text-sm text-gray-800 flex justify-between"
                >
                  <span>{s.name}</span>
                  <button
                    onClick={() =>
                      navigate("/schemes", {
                        state: { preselectCategory: activeFilter.category },
                      })
                    }
                    className="text-green-700 hover:underline"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
