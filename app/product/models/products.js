const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productDescription: {
    type: String,
  },
  productCategory: {
    type: String,
  },
  productImageName: {
    type: String,
  },
  productImagePath: {
    type: String,
  },
});

const Product = mongoose.model("Product", schema);
module.exports.Product = Product;
