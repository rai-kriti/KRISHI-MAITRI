const Groq = require("groq-sdk");
const schemes = require("../data/schemeCatalog");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const getSchemeSummary = async (req, res) => {
  try {
    const { schemeId } = req.params;

    const scheme = schemes.find(s => s.schemeId === schemeId);
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }

    const prompt = `
You are an expert on Indian government schemes for farmers.

Your task is to explain the scheme in a clear, detailed, and farmer-friendly way.
Do NOT be overly legal or strict.
Use general understanding, not verification rules.

Scheme details:
Name: ${scheme.name}
Category: ${scheme.category}
Level: ${scheme.level}
Applicable States: ${scheme.states.join(", ")}

Explain the scheme so that a farmer or student can fully understand it by reading this once.

Return ONLY valid JSON.
No markdown.
No extra text.

Use this format:
{
  "overview": "2–3 line simple explanation of what this scheme is about",

  "keyBenefits": [
    "Major benefit in simple words",
    "Another important benefit"
  ],

  "whoCanBenefit": [
    "Types of farmers or families who usually benefit",
    "General target groups"
  ],

  "generalEligibility": [
    "Common conditions usually expected (not strict rules)",
    "Mention land, farming activity, income in a soft way"
  ],

  "opportunities": [
    "How this scheme can help improve income, reduce risk, or support farming",
    "Any long-term or indirect advantage"
  ],

  "limitations": [
    "Practical limitations or things farmers should be aware of",
    "Situations where benefits may be delayed or limited"
  ],

  "whyThisSchemeMatters": [
    "Why the government introduced this scheme",
    "How it fits into the larger agriculture support system"
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.25,
      messages: [{ role: "user", content: prompt }]
    });

    let raw = completion.choices[0].message.content.trim();
    if (raw.startsWith("```")) {
      raw = raw.replace(/```json|```/g, "").trim();
    }

    let summary;
    try {
      summary = JSON.parse(raw);
    } catch (e) {
      console.error("AI RAW OUTPUT:", raw);
      return res.status(500).json({ error: "AI response parsing failed" });
    }

    res.json({
      schemeId,
      name: scheme.name,
      summary
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI summary generation failed" });
  }
};

module.exports = { getSchemeSummary };
