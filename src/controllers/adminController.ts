import sendMail from "../utils/mail.js";
import UserInfo from "../models/userInfo.js";
import{type Request, type Response } from "express";

const getAllRequests = async (req : Request, res : Response) : Promise<void> => {
  try {
    const requests = await UserInfo.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .select("name userEmail latitude longitude image status");

    res.render("requests", { requests });
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};

const check = async (req : Request, res : Response) => {
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

    const message : any =
      newStatus === "accepted"
        ? `Hello,\n\nGood news! Your recycle request has been accepted. We will process it shortly.\n\nThank you for contributing to a cleaner planet 🌍.`
        : `Hello ,\n\nWe regret to inform you that your recycle request has been rejected.\n\nIf you think this was a mistake, please contact our support team.`;

    try {
      await sendMail({
            to: updated.userEmail,
            subject,
            html: message,
        });
    } catch (mailErr : any) {
      console.error("Error sending mail:", mailErr);
    }

    res.status(200).json(updated);
  } catch (err : any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export { getAllRequests, check };
