const jwt = require("jsonwebtoken");
const JWT_SECRET = "sjnkjcnk";

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const response = jwt.verify(token, JWT_SECRET);

        req.userId = response.id;
        next();

    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    auth,
    JWT_SECRET
};