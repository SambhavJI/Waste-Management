const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/authRouter.js");
const userAuth = require("./middlewares/auth");
const path = require("path");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

app.use("/ml", express.static(path.join(__dirname, "ml")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
