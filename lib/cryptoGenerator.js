const crypto = require("crypto");

function generateCrypto() {
  return crypto.randomBytes(20).toString("hex");
}

module.exports = { generateCrypto };
