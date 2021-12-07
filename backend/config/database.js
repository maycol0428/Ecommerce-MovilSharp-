const mongoose = require("mongoose");

// YZmSQCskJA97ZXMm

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`MongoDB connected with server ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
