const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  imageName: {
    type: String,
  },
  imagePath: {
    type: String,
  },
});

const Product = mongoose.model("Product", schema);
module.exports.Product = Product;
