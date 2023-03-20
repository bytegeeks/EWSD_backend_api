const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
    try {
        const tkn = jwt.sign(
            JSON.stringify(payload),
            process.env.JWT_SECRET_KEY,
            {
                algorithm: "HS256",
            }
        );
        return tkn;
    } catch (error) {
        return error;
    }
};

const verifyJWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: ["HS256"],
        });
    } catch (error) {
        return error;
    }
};

module.exports = {
    generateJWT,
    verifyJWT,
};
