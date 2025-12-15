import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

export default function MSPTopCharts({ data }) {
  const top5 = data.slice(0, 5);

  const seasonSplit = [
    { name: "Kharif", value: data.filter(d => d.season === "kharif").length },
    { name: "Rabi", value: data.filter(d => d.season === "rabi").length }
  ];

  const COLORS = ["#5C832F", "#C17C1E"];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-10">

      {/* Top MSP Crops */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-4">Top MSP Crops</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={top5}>
            <XAxis dataKey="displayName" hide />
            <Tooltip />
            <Bar dataKey="msp" fill="#E67E22" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-4">Season Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={seasonSplit}
              dataKey="value"
              outerRadius={90}
              label
            >
              {seasonSplit.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
