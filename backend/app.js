const express = require("express");
const path = require("path");
const app = express();

// const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// Middlewares
// app.use(
//   cors({
//     credentials: true,
//     // REACT CLIENT
//     origin: ["http://localhost:3000", "http://192.168.1.39:3000"],
//   })
// );

var dir = path.join(__dirname, "storage");
app.use("/storage", express.static(dir));
app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());
// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middlewares for errors
app.use(errorMiddleware);

module.exports = app;
