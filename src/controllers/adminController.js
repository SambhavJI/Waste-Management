const sendMail = require("../utils/mail");
const UserInfo = require("../models/userInfo");

const getAllRequests = async (req, res) => {
  try {
    const requests = await UserInfo.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .select("name userEmail latitude longitude image status");

    res.render("requests", { requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const check = async (req, res) => {
  try {
    const { status, reqid } = req.body;

    const newStatus = status === "accepted" ? "accepted" : "rejected";

    const updated = await UserInfo.findByIdAndUpdate(
      reqid,
      { status: newStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }
    const subject =
      newStatus === "accepted"
        ? "Your recycle request has been accepted ✅"
        : "Your recycle request has been rejected ❌";

    const message =
      newStatus === "accepted"
        ? `Hello,\n\nGood news! Your recycle request has been accepted. We will process it shortly.\n\nThank you for contributing to a cleaner planet 🌍.`
        : `Hello ,\n\nWe regret to inform you that your recycle request has been rejected.\n\nIf you think this was a mistake, please contact our support team.`;

    try {
      await sendMail(updated.userEmail, subject, message);
    } catch (mailErr) {
      console.error("Error sending mail:", mailErr);
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllRequests, check };
