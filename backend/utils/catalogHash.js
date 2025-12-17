const crypto = require("crypto");
const schemes = require("../data/schemeCatalog");

function getCatalogHash() {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(schemes))
    .digest("hex");
}

module.exports = { getCatalogHash };
