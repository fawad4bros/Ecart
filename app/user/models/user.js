const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superadmin"],
  },
});

const User = mongoose.model("User", schema);
module.exports.User = User;

// name: {
//   firstname: {
//     type: String,
//   },
//   lastname: {
//     type: String,
//   },
// },
// address: {
//   city: {
//     type: String,
//   },
//   street: {
//     type: String,
//   },
//   number: {
//     type: Number,
//   },
//   zipcode: {
//     type: Number,
//   },
//   geolocation: {
//     lat: {
//       type: Number,
//     },
//     long: {
//       type: Number,
//     },
//   },
// },
// phone: {
//   type: Number,
// },
