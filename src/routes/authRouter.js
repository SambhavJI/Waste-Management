const express = require("express")
const authRouter = express.Router();
const {login, signup} = require("../controllers/authController.js") 

authRouter.post("/login", login);
authRouter.post("/signup", signup);

module.exports = authRouter;