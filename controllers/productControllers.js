const mongoose = require("mongoose");
const fs = require("fs");
const productModel = require("../models/products");
const uploadFile = require("../lib/multer");
const allproduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (Object.keys(products).length === 0) {
      return res.status(404).json({ message: "Collection is empty" });
    }
    return res.status(200).json({ products: products });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const product = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ product: product });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const addproduct = async (req, res) => {
  try {
    uploadFile(req, res, (err) => {
      if (req.file === undefined) {
        return res.status(400).json({
          message: "image extension should be jpeg|jpg|png",
        });
      }
      const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        productTitle: req.body.title,
        productPrice: req.body.price,
        productDescription: req.body.description,
        productCategory: req.body.category,
        productImageName: req.file.filename,
        productImagePath: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
      });
      (async () => {
        const result = await product.save();
        return res.status(201).json({
          Product: result,
        });
      })();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateproduct = async (req, res) => {
  try {
    const checkProduct = await productModel.findOne({ _id: req.params.id });
    if (!checkProduct) {
      return res.status(500).json({
        message: "No product found",
      });
    }
    const previousProductImage = checkProduct.productImageName;
    uploadFile(req, res, (err) => {
      if (req.file === undefined) {
        return res.status(400).json({
          message: "image extension should be jpeg|jpg|png",
        });
      }
      const filter = { _id: req.params.id };
      const update = {
        productTitle: req.body.title,
        productPrice: req.body.price,
        productDescription: req.body.description,
        productCategory: req.body.category,
        productImageName: req.file.filename,
        productImagePath: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
      };
      const option = { new: true };
      (async () => {
        const result = await productModel.findOneAndUpdate(
          filter,
          update,
          option
        );
        const path = `public/images/${previousProductImage}`;
        fs.unlinkSync(path);
        return res.status(200).json({
          product: result,
        });
      })();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteproduct = async (req, res) => {
  try {
    const result = await productModel.findOneAndRemove({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "No product found" });
    }
    const imagePath = `public/images/${result.productImageName}`;
    fs.unlinkSync(imagePath);
    return res.status(200).json({
      message: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  allproduct,
  product,
  addproduct,
  updateproduct,
  deleteproduct,
};

// function a(){
//   data
//   function b(){
//     return data
//   }
//   return b
// }
