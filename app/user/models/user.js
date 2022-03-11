const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  _id: String,
  productTitle: String,
  productPrice: Number,
  productDescription: String,
  productCategory: String,
  productImageName: String,
  productImagePath: String,
});
module.exports = mongoose.model("product", productSchema, "products");
