const mongoose = require("mongoose");
const productModel = require("../models/products");
const allproduct = async (req, res) => {};
const product = async (req, res) => {};
const addproduct = async (req, res) => {
  console.log("hello", req.body);
  const product = new productModel({
    _id: new mongoose.Types.ObjectId(),
    product_title: req.body.title,
    product_price: req.body.price,
    product_description: req.body.description,
    product_image: req.body.image,
    product_category: req.body.category,
  });
  await product
    .save()
    .then((result) => {
      return res.status(201).json({
        message: {
          Product_Added: result._id,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};
const updateproduct = async (req, res) => {};
const deleteproduct = async (req, res) => {};
module.exports = {
  allproduct,
  product,
  addproduct,
  updateproduct,
  deleteproduct,
};
