const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");
const verifyToken = require("../../middlewares/jwt.middleware");
const authController = require("../controller/authControllers");

router.get("/get-users", userController.getUsers);
router.get("/get-user/:id", userController.getUser);

router.put("/update-user/:id", verifyToken, userController.updateUser);
router.delete("/delete-user/:id", verifyToken, userController.deleteUser);

router.post("/add-to-wishlist", verifyToken, userController.userWishList);
router.post("/add-comment", verifyToken, userController.addComment);
router.post(
  "/add-rating",
  authController.userAuth,
  authController.checkRole(["user"]),
  userController.addRating
);

// router.post("/user-login", userController.userLogin);
// router.post("/user-registration", userController.userRegistration());
// Auth Routes
router.post("/user-registration", async (req, res) => {
  await authController.userRegister(req, "user", res);
});
router.post("/user-login", async (req, res) => {
  await authController.userLogin(req, "user", res);
});
router.post("/admin-registration", async (req, res) => {
  await authController.userRegister(req, "admin", res);
});
router.post("/admin-login", async (req, res) => {
  await authController.userLogin(req, "admin", res);
});
router.post("/superadmin-registration", async (req, res) => {
  await authController.userRegister(req, "superadmin", res);
});
router.post("/superadmin-login", async (req, res) => {
  await authController.userLogin(req, "superadmin", res);
});

module.exports = router;
