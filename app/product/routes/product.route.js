const express = require("express");
const router = express.Router();

const productController = require("../controller/productControllers");

router.get("/get-products", productController.products);
router.get("/get-product/:id", productController.product);
router.post("/add-product", productController.addProduct);
router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get(
  "/get-product-category/:category",
  productController.getProductsByCategory
);
router.get("/get-categories", productController.getProductCategories);

module.exports = router;
