const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.db);
  console.log(`MongoDB Connected: ${conn.connection._connectionString}`);
};

module.exports = connectDB;
