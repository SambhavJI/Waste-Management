import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { type Request, type Response } from "express";
import validator from "validator";
import sendMail from "../utils/mail.js";

const signup = async (req : Request, res : Response) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        const subject = "Welcome to Smart Waste Manager ♻️";
        const html = `
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Welcome to <b>RECYCLIFY — The Smart Waste Manager</b> 🌍 We're thrilled to have you!</p>

      <p>With our platform, you can:</p>
      <ul>
        <li>✅ Identify waste instantly using AI image classification</li>
        <li>♻️ Learn whether it’s recyclable, compostable, or hazardous</li>
        <li>💡 Get smart disposal tips to reduce environmental impact</li>
        <li>📊 Track your contributions towards a cleaner planet</li>
      </ul>

      <p>Together, we can reduce waste, recycle more, and protect our environment. 🌱</p>
      <p>If you have any questions, just reply to this email — we’re here to help!</p>

      <p>Cheers,<br>
      <strong>The RECYCLIFY Team</strong></p>
    `;

        await sendMail({
            to: user.email,
            subject,
            html,
        });

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: "7d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,   
            sameSite: "none",

            maxAge: 24 * 60 * 60 * 1000
        });


        res.status(201).json({
            message: "Signup successful! Welcome email sent.",
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};


const login = async (req : Request, res : Response) => {
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

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,   // true in production
            sameSite: "none",

            maxAge: 24 * 60 * 60 * 1000
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

    } catch (err : any) {
        res.status(400).json({ error: err.message });
    }
}
const logout = async (req : Request, res : Response ) => {
    res.cookie("token", null, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now())
    }).send("Logout succesfull")
}

module.exports = { signup, login, logout };