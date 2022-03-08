const mongoose = require("mongoose");
const fs = require("fs");
const _ = require("lodash");
const productModel = require("../models/products");
const { uploadFilee, uploadTexte } = require("../lib/multer");
const allproduct = async (req, res) => {
  await productModel
    .find()
    .then((product) => {
      if (_.isEmpty(product)) {
        return res.status(404).json({
          message: "Collection is empty",
        });
      } else {
        return res.status(200).json({ products: product });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};
const product = async (req, res) => {
  await productModel
    .findOne({ _id: req.params.id })
    .then((product) => {
      if (_.isEmpty(product)) {
        return res.status(404).json({ message: "No id was provided" });
      } else {
        return res.status(200).json({
          product: product,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};
const addproduct = async (req, res) => {
  uploadFilee(req, res, (err) => {
    const fileType = req.file;
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    } else if (fileType === undefined) {
      return res.status(400).json({
        message: "image extension should be jpeg|jpg|png",
      });
    } else {
      const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        product_title: req.body.title,
        product_price: req.body.price,
        product_description: req.body.description,
        product_category: req.body.category,
        product_imageName: req.file.filename,
        product_imagePath: "http://localhost:3000/image/" + req.file.filename,
      });
      product //await looking
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
    }
  });
};
const updateproduct = async (req, res) => {
  uploadFilee(req, res, (err) => {
    const fileType = req.file;
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    } else if (fileType === undefined) {
      return res.status(400).json({
        message: "image extension should be jpeg|jpg|png",
      });
    } else {
      const filter = { _id: req.params.id };
      const update = {
        product_title: req.body.title,
        product_price: req.body.price,
        product_description: req.body.description,
        product_category: req.body.category,
        product_imageName: req.file.filename,
        product_imagePath: "http://localhost:3000/image/" + req.file.filename,
      };
      const option = { new: false };
      productModel //await looking
        .findOneAndUpdate(filter, update, option)
        .then((result) => {
          const path = `public/images/${result.product_imageName}`;
          try {
            fs.unlinkSync(path);
          } catch (err) {
            res.status(500).json({
              message: err.message,
            });
          }
          return res.status(201).json({
            message: {
              updated_product: result._id,
            },
          });
        })
        .catch((err) => {
          return res.json({
            message: err.message,
          });
        });
    }
  });
};
const deleteproduct = async (req, res) => {
  await productModel
    .findOneAndRemove({ _id: req.params.id })
    .then((product) => {
      if (_.isEmpty(product)) {
        return res.status(404).json({
          message: "No id was provided",
        });
      } else {
        const path = `public/images/${product.product_imageName}`;
        try {
          fs.unlinkSync(path);
          return res.status(200).json({
            message: `${product.product_title} product deleted `,
          });
        } catch (err) {
          res.status(500).json({
            error: err,
          });
        }
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};
module.exports = {
  allproduct,
  product,
  addproduct,
  updateproduct,
  deleteproduct,
};
