const express = require("express");
const router = express.Router();
const {
  allproduct,
  product,
  addproduct,
  updateproduct,
  deleteproduct,
} = require("../controllers/productControllers");
router.get("/products", allproduct);
router.get("/product/:id", product);
router.post("/add", addproduct);
router.put("/update/:id", updateproduct);
router.delete("/delete/:id", deleteproduct);
module.exports = router;
