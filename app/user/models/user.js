const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: {
    type: String,
  },
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
  name: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  address: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    number: {
      type: Number,
    },
    zipcode: {
      type: Number,
    },
    geolocation: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
  phone: {
    type: Number,
  },
});

const User = mongoose.model("User", schema);
module.exports.User = User;
