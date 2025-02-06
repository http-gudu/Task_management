const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "gkop", (err, user) => {
        if (err) {
            return res.sendStatus(403).json(err);
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
