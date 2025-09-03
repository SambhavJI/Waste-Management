const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                error: "Authentication required. Please login." 
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (jwtError) {
            return res.status(401).json({ 
                error: "Invalid or expired token. Please login again." 
            });
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ 
                error: "User not found. Please login again." 
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ 
            error: "Authentication failed. Please try again." 
        });
    }
};

module.exports = userAuth 