const express = require("express")
const authRouter = express.Router();
const {login, signup,logout} = require("../controllers/authController.js") 

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout);

module.exports = authRouter;