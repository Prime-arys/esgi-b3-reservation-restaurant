const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const getUserById = require("../utils/auth").getUserById;

const jwtSecret = "jwt_secret";
const jwtExpiration = "72h";
const jwtAlgorithm = "HS256";
const jwtIssuer = "http://localhost:3000";
const jwtOptions = {
    secret: jwtSecret,
    algorithms: [jwtAlgorithm],
    issuer: jwtIssuer,
    expiresIn: jwtExpiration,
    getToken: function fromHeaderOrCookie(req) {
        // Check Authorization header first
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        // Check for token in cookies
        else if (req.cookies && req.cookies.token) {
            return req.cookies.token;
        }
        return null; // No token found
    }
};


function generateToken(user) {
    const payload = {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpiration,
        algorithm: jwtAlgorithm,
        issuer: jwtIssuer,
    });
}


function authenticateJWT(req, res, next) {
    expressjwt(jwtOptions)(req, res, async function (err) {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const id = req.auth.user_id
        const user = await getUserById(id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user;
        next();
    });
}



module.exports = {
    generateToken,
    authenticateJWT,
};
