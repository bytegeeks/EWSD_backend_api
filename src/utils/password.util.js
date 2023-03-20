const crypto = require("crypto");

const getHash = (payload) => {
    const SECRET = process.env.JWT_SECRET_KEY;
    return crypto.createHash("sha256", SECRET).update(payload).digest("hex");
};

module.exports = { getHash };
