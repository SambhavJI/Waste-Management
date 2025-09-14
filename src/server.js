const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/authRouter.js");
const uploadRouter = require("./routes/uploadRouter.js");
const imageRouter = require("./routes/imageRouter.js");
const cors = require("cors");
const adminRouter = require("./routes/adminRouter.js");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,               
}));
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
