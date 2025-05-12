const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const getUserById = require("../utils/auth").getUserById;
const ROLES = require("../enums/userRole").ROLES;
const process = require("process");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;
const jwtAlgorithm = process.env.JWT_ALGORITHM;
const jwtIssuer = process.env.JWT_ISSUER;
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


function createAuthMiddleware(requireAdmin = false) {
    return function(req, res, next) {
        expressjwt(jwtOptions)(req, res, async function (err) {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            
            try {
                const user = await getUserById(req.auth.user_id);
                
                if (!user) {
                    return res.status(401).json({ error: "User not found" });
                }
                
                if (requireAdmin && user.role !== ROLES.ADMIN) {
                    return res.status(403).json({ error: "Admin access required" });
                }
                
                req.user = user;
                next();
            } catch (error) {
                console.error("Authentication error:", error);
                return res.status(500).json({ error: "Server error" });
            }
        });
    };
}

// Standard JWT authentication middleware
const authenticateJWT = createAuthMiddleware(false);

// Admin-only JWT authentication middleware 
const authenticateJWTAdmin = createAuthMiddleware(true);

module.exports = {
    generateToken,
    authenticateJWT,
    authenticateJWTAdmin
};
