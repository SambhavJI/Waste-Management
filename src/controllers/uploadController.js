const userInfoSchema = require("../models/userInfo");
const sendMail = require("../utils/mail");

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
        const to = user.email;
        const subject = "♻️ Your Recycling Request is Being Validated!";
        const text = `Hi ${user.name},

Thank you for submitting your recycling request with Recyclify The Smart Waste Manager. 🌍✨

We’ve successfully received your request and our team is currently validating the details.  
This step ensures that the waste type and disposal method are correctly verified.

🔄 What happens next?
- Your request will be reviewed and validated  
- You’ll receive a confirmation email once it’s approved  
- After validation, you’ll be guided with the next steps  

We’ll notify you shortly once the process is complete.  

Thank you for doing your part in making waste management smarter and greener. 🌱  

Best regards,  
The RECYCLIFY Team  
`;
        await sendMail(to, subject, text);
        res.status(201).json({ message: "Info uploaded successfully" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = uploadInfo 