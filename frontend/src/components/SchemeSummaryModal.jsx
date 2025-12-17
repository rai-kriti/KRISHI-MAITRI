export default function SchemeSummaryModal({ data, onClose }) {
  if (!data || !data.summary) return null;

  const {
    overview,
    keyBenefits,
    whoCanBenefit,
    generalEligibility,
    opportunities,
    limitations,
    whyThisSchemeMatters
  } = data.summary;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative overflow-y-auto max-h-[90vh]">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
        >
          ✕
        </button>

        {/* TITLE */}
        <h3 className="text-2xl font-semibold mb-4">
          {data.name}
        </h3>

        {/* OVERVIEW */}
        {overview && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Overview</h4>
            <p className="text-gray-700">{overview}</p>
          </div>
        )}

        {/* KEY BENEFITS */}
        {keyBenefits?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Key Benefits</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {keyBenefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {/* WHO CAN BENEFIT */}
        {whoCanBenefit?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Who Can Benefit</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {whoCanBenefit.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* GENERAL ELIGIBILITY */}
        {generalEligibility?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">General Eligibility (Indicative)</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {generalEligibility.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* OPPORTUNITIES */}
        {opportunities?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Opportunities</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {opportunities.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {/* LIMITATIONS */}
        {limitations?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Limitations / Things to Note</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {limitations.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        )}

        {/* WHY THIS SCHEME MATTERS */}
        {whyThisSchemeMatters?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Why This Scheme Matters</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {whyThisSchemeMatters.map((y, i) => (
                <li key={i}>{y}</li>
              ))}
            </ul>
          </div>
        )}

        {/* DISCLAIMER */}
        <p className="text-xs text-gray-500 mt-6">
          Note: This information is AI-generated for awareness purposes only.
          For official eligibility and application details, always refer to the
          government notification or website.
        </p>

      </div>
    </div>
  );
}
