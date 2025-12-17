const schemes = require("../data/schemeCatalog");

const getSchemesByState = (req, res) => {
  const { state, category } = req.query;

  let filtered = schemes;

  // ✅ CATEGORY FILTER (MAIN FIX)
  if (category) {
    filtered = filtered.filter(
      (s) => s.category === category
    );
  }

  // ✅ STATE FILTER (AS BEFORE)
  if (state) {
    filtered = filtered.filter(
      (s) =>
        s.states.includes("ALL") ||
        s.states.includes(state)
    );
  }

  res.json({
    state: state || "ALL",
    category: category || "ALL",
    schemes: filtered,
  });
};

module.exports = { getSchemesByState };
