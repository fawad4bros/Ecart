const express = require("express");
const router = express.Router();
const uploadFile = require("../../middlewares/multer.middleware");
const productController = require("../controller/productControllers");

router.get("/get-products", productController.products);
router.get("/get-product/:id", productController.product);
router.post("/add-product", uploadFile, productController.addProduct);
router.put("/update-product/:id", uploadFile, productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.delete("/delete-products", productController.deleteAllProducts);
router.get(
  "/get-product-category/:category",
  productController.getProductsByCategory
);
router.get("/get-categories", productController.getProductCategories);

module.exports = router;
