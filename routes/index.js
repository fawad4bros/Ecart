const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
module.exports = router;
