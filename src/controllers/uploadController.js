const userInfoSchema = require("../models/userInfo");

const uploadInfo = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please authenticate")
        }
        const { latitude, longitude, image } = req.body;
        if (!latitude || !longitude || !image) {
            throw new Error("Please provide all the details")
        }
        const userInfo = new userInfoSchema({
            userEmail: user.email,
            latitude,
            longitude,
            image
        })
        await userInfo.save();
        res.status(201).json({ message: "Info uploaded successfully" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = uploadInfo 