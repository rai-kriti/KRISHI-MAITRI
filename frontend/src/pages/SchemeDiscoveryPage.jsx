import { useEffect, useState } from "react";
import axios from "axios";
import SchemeCard from "../components/SchemeCard";
import SchemeSummaryModal from "../components/SchemeSummaryModal";

const STATES = ["Punjab", "Uttar Pradesh", "Madhya Pradesh"];

export default function SchemeDiscoveryPage() {
  const [state, setState] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = state
      ? `http://localhost:5000/api/discover/schemes?state=${state}`
      : `http://localhost:5000/api/discover/schemes`;

    axios.get(url, { withCredentials: true })
      .then(res => setSchemes(res.data.schemes));
  }, [state]);

  const openSummary = async (schemeId) => {
    setLoading(true);
    const res = await axios.get(
      `http://localhost:5000/api/schemes/${schemeId}/summary`,
      { withCredentials: true }
    );
    setSummary(res.data);
    setLoading(false);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        Government Schemes
      </h2>

      {/* STATE SELECT */}
      <select
        className="border p-2 rounded mb-6"
        value={state}
        onChange={e => setState(e.target.value)}
      >
        <option value="">All India</option>
        {STATES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* SCHEME LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map(s => (
          <SchemeCard
            key={s.schemeId}
            scheme={s}
            onSelect={openSummary}
          />
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            Loading summary…
          </div>
        </div>
      )}

      {/* MODAL */}
      {summary && (
        <SchemeSummaryModal
          data={summary}
          onClose={() => setSummary(null)}
        />
      )}
    </div>
  );
}
