const app = require("./app");
const connectDatabase = require("./config/database");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Handled Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server die to Uncaught Exception Rejection`);
  process.exit(1);
});

// Connecting to database
connectDatabase();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server in port ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server die to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
