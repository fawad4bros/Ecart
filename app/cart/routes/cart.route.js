const express = require("express");
const router = express.Router();

const cartController = require("../controller/cartControllers");

router.get("/get-carts", cartController.getCarts);
router.get("/get-carts-bydate", cartController.getcartsByDateRange);
router.get("/get-carts-bydatetime", cartController.getCartsByDateTime);
router.get("/get-cart/:id", cartController.getCart);
router.get("/get-user-cart/:id", cartController.getUserCart);
router.post("/add-cart", cartController.addCart);
router.put("/update-cart/:id", cartController.updateCart);
router.delete("/delete-all-carts", cartController.deleteAllCarts);
router.delete("/delete-cart/:id", cartController.deleteCart);

module.exports = router;
