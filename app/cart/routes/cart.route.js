const express = require("express");
const router = express.Router();

const cartController = require("../controller/cartControllers");
const verifyToken = require("../../middlewares/jwt.middleware");

router.get("/get-carts", cartController.getCarts);
router.get("/get-carts-bydate", cartController.getcartsByDateRange);
router.get("/get-carts-bydatetime", cartController.getCartsByDateTime);
router.get("/get-cart/:id", cartController.getCart);
router.get("/get-user-cart/:id", cartController.getUserCart);

router.get("/get-previous-orders/:id", cartController.userPreviousOrders);

router.post("/add-cart", verifyToken, cartController.addCart);
router.put("/update-cart/:id", verifyToken, cartController.updateCart);
router.delete("/delete-all-carts", verifyToken, cartController.deleteAllCarts);
router.delete("/delete-cart/:id", verifyToken, cartController.deleteCart);

module.exports = router;
