const UserInfo = require("../models/userInfo");

const getAllRequests = async (req, res) => {
    try {
        const requests = await UserInfo.find({ status: "pending" })
            .sort({ createdAt: -1 })
            .select("name userEmail latitude longitude image");

        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = getAllRequests;
