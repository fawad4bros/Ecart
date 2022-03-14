const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");
const verifyToken = require("../../middlewares/jwt.middleware");

router.get("/get-users", userController.getUsers);
router.get("/get-user/:id", userController.getUser);

router.post("/user-registration", userController.userRegistration);
router.put("/update-user/:id", verifyToken, userController.updateUser);
router.delete("/delete-user/:id", verifyToken, userController.deleteUser);

router.post("/user-login", userController.userLogin);

router.post("/add-to-wishlist", verifyToken, userController.userWishList);
router.post("/add-comment", verifyToken, userController.addComment);
router.post("/add-rating", verifyToken, userController.addRating);

module.exports = router;
