const fs = require("fs");

const { Product } = require("../models/products");
const uploadFile = require("../../../lib/multer");

class ProductController {
  constructor() {}

  products = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    try {
      const products = await Product.find({})
        .limit(limit)
        .sort({ productPrice: sort });
      if (Object.keys(products).length === 0) {
        return res.status(404).json({ message: "Collection is empty" });
      }
      return res.status(200).json({ products: products });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  product = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: "No product found" });
      }
      return res.status(200).json({ product: product });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  addProduct = async (req, res) => {
    try {
      uploadFile(req, res, (err) => {
        if (req.file === undefined) {
          return res.status(400).json({
            message: "image extension should be jpeg|jpg|png",
          });
        }
        const product = Product.create({
          productTitle: req.body.title,
          productPrice: req.body.price,
          productDescription: req.body.description,
          productCategory: req.body.category,
          productImageName: req.file.filename,
          productImagePath: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        });
        (async () => {
          await product.save();
          return res.status(201).json({
            message: "Product Successfully Created",
          });
        })();
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const checkProduct = await Product.findOne({ _id: req.params.id });
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
          productImagePath: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        const option = { new: true };
        (async () => {
          await Product.findOneAndUpdate(filter, update, option);
          const path = `public/images/${previousProductImage}`;
          fs.unlinkSync(path);
          return res.status(200).json({
            message: "Product Successfully Updated",
          });
        })();
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const result = await Product.findOneAndRemove({
        _id: req.params.id,
      });
      if (!result) {
        return res.status(404).json({ message: "No product found" });
      }
      const imagePath = `public/images/${result.productImageName}`;
      fs.unlinkSync(imagePath);
      return res.status(200).json({
        message: "Product Successfully Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  getProductsByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const limit = Number(req.query.limit) || 0;
      const sort = req.query.sort === "desc" ? -1 : 1;
      const result = await Product.find({ productCategory: category })
        .limit(limit)
        .sort({ productPrice: sort });
      return res.status(200).json({
        Products: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  getProductCategories = async (req, res) => {
    try {
      const result = await Product.distinct("productCategory");
      return res.status(200).json({
        Categories: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };
}
module.exports = new ProductController();
