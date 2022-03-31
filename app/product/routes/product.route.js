const express = require("express");
const router = express.Router();

const uploadFile = require("../../middlewares/multer.middleware");
const productController = require("../controller/productControllers");
const verifyToken = require("../../middlewares/jwt.middleware");

router.get("/get-products", productController.products);
router.get("/get-product/:id", productController.product);
router.post(
  "/add-product",
  verifyToken,
  uploadFile,
  productController.addProduct
);
router.put(
  "/update-product/:id",
  verifyToken,
  uploadFile,
  productController.updateProduct
);
router.delete(
  "/delete-product/:id",
  verifyToken,
  productController.deleteProduct
);
router.delete(
  "/delete-products",
  verifyToken,
  productController.deleteAllProducts
);
router.get(
  "/get-product-category/:category",
  productController.getProductsByCategory
);
router.get("/get-categories", productController.getProductCategories);
router.get("/search-title", productController.searchTitle);

module.exports = router;
