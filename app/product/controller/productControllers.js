const fs = require("fs");
const { async } = require("rxjs");

const { Product } = require("../models/products");

class ProductController {
  constructor() {}

  products = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    try {
      const products = await Product.find({})
        .limit(limit)
        .sort({ price: sort });
      if (Object.keys(products).length === 0) {
        return res.status(404).json({ message: "Collection is empty" });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  product = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: "No product found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  addProduct = async (req, res) => {
    if (req.file === undefined) {
      return res.status(400).json({
        message: "image extension should be jpeg|jpg|png",
      });
    }
    try {
      const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageName: req.file.filename,
        imagePath: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      });
      return res.status(200).json({
        message: "Product Successfully Created",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  updateProduct = async (req, res) => {
    const checkProduct = await Product.findOne({ _id: req.params.id });
    if (!checkProduct) {
      return res.status(500).json({
        message: "No product found",
      });
    }
    const previousProductImage = checkProduct.imageName;
    if (req.file === undefined) {
      return res.status(400).json({
        message: "image extension should be jpeg|jpg|png",
      });
    }
    try {
      const filter = { _id: req.params.id };
      const update = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageName: req.file.filename,
        imagePath: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
      const option = { new: true };
      await Product.findOneAndUpdate(filter, update, option);
      const path = `public/images/${previousProductImage}`;
      fs.unlinkSync(path);
      return res.status(200).json({
        message: "Product Successfully Updated",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
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
      const imagePath = `public/images/${result.imageName}`;
      fs.unlinkSync(imagePath);
      return res.status(200).json({
        message: "Product Successfully Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getProductsByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const limit = Number(req.query.limit) || 0;
      const sort = req.query.sort === "desc" ? -1 : 1;
      const result = await Product.find({ category: category })
        .limit(limit)
        .sort({ price: sort });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getProductCategories = async (req, res) => {
    try {
      const result = await Product.distinct("category");
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      return res.status(200).json({
        message: "Product-Collection Successfully Emptied",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  searchTitle = async (req, res) => {
    try {
      if (req.query.title) {
        let result = await Product.aggregate([
          {
            $search: {
              index: "default",
              compound: {
                must: [
                  {
                    text: {
                      query: req.query.title,
                      path: "title",
                      fuzzy: {
                        maxEdits: 1,
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            $limit: 10,
          },
          {
            $project: {
              title: 1,
              price: 1,
              description: 1,
              category: 1,
              imageName: 1,
              imagePath: 1,
              // score: { $meta: "searchScore" },
            },
          },
        ]);
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}
module.exports = new ProductController();
