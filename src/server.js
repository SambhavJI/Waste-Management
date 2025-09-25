const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/authRouter.js");
const uploadRouter = require("./routes/uploadRouter.js");
const imageRouter = require("./routes/imageRouter.js");
const cors = require("cors");
const path = require("path");
const adminRouter = require("./routes/adminRouter.js");

app.use(
  cors({
    origin: "https://waste-management-frontend-topaz.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
console.log("Views directory:", path.join(__dirname, "views"));


app.use("/", authRouter);

app.use("/",imageRouter)

app.use("/",uploadRouter);

app.use("/admin",adminRouter);

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
