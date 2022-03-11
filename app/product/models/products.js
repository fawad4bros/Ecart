const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: String,
  productTitle: String,
  productPrice: Number,
  productDescription: String,
  productCategory: String,
  productImageName: String,
  productImagePath: String,
});
const Product = mongoose.model("Product", schema);
module.exports.Product = Product;
