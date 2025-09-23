const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const sendMail = require("../utils/mail.js");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user exists
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        const to = user.email;
        const subject = "Welcome to Smart Waste Manager ♻️";
        const text = `Hi ${user.name},

Welcome to RECYCLIFY The Smart Waste Manager — we’re excited to have you join us in making waste management smarter and greener! 🌍

With our platform, you can:
✅ Identify waste instantly using AI image classification  
♻️ Learn whether it’s recyclable, compostable, or hazardous  
💡 Get smart disposal tips to reduce environmental impact  
📊 Track your contributions towards a cleaner planet  

Together, we can reduce waste, recycle more, and protect our environment. 🌱

If you have any questions or feedback, just reply to this email — we’re here to help!

Cheers,  
The RECYCLIFY Team
`;

        await sendMail(to, subject, text);

        res.status(201).json({ message: "User successfully created" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            // secure: true,
            // sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const logout=async (req,res)=>{
    res.cookie("token",null , {
        expires:new Date(Date.now())
    }).send("Logout succesfull")
}

module.exports = { signup, login,logout };