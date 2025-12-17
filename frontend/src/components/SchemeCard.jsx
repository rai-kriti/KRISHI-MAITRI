export default function SchemeCard({ scheme, onSelect }) {
  return (
    <div
      onClick={() => onSelect(scheme.schemeId)}
      className="cursor-pointer border rounded-xl p-4 bg-white shadow
                 hover:bg-gray-50 transition"
    >
      <h3 className="font-semibold text-lg">
        {scheme.name}
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {scheme.level.toUpperCase()} • {scheme.category}
      </p>

      <p className="text-xs text-blue-600 mt-2">
        Click to view summary →
      </p>
    </div>
  );
}
