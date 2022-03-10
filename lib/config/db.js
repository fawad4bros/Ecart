const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.db);
  console.log(`MongoDB Connected`);
};

module.exports = connectDB;
