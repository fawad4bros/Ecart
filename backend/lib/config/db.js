const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Something went wrong: \n" + error);
  }
};

module.exports = connectDB;
