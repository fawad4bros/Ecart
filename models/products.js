const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  product_title: String,
  product_price: Number,
  product_description: String,
  product_category: String,
  product_image: String,
});
module.exports = mongoose.model("product", productSchema, "products");
