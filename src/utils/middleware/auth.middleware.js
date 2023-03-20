const { verifyJWT } = require("../jwt.util");

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader && authHeader.split(" ")[1];
    if (!authToken)
        return res
            .status(401)
            .send({ status: 0, message: "missing access token" });

    //verify token
    try {
        const payload = verifyJWT(authToken);
        if (
            payload.message == "invalid token" ||
            payload.message === "jwt malformed"
        ) {
            return res.status(401).send({
                status: 2,
                message: "unauthorized to perform this request",
            });
        }

        next();
    } catch (error) {
        return res
            .status(401)
            .send({ status: 0, message: "invalid or missing access token" });
    }
};

module.exports = authentication;
