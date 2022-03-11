const express = require("express");
const router = express.Router();
const userController = require("../controller/userControllers");
router.get("/get-users", userController.getUsers);
router.get("/get-user/:id", userController.getUser);
router.post("/add-user", userController.addUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
module.exports = router;