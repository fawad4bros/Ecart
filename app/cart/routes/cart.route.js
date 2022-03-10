const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartControllers");
router.get("/", cartController.getAll);
router.get("/byDate", cartController.getDateRange);
router.get("/byDateTime", cartController.getByDateTime);
router.get("/:id", cartController.getSingle);
//Question: byDate api does not work under the getSingle
//router.get("/byDate/", getDateRange);
router.get("/user/:user", cartController.getUserCart);
router.post("/add", cartController.addNewCart);
router.put("/:id", cartController.updateCart);
router.delete("/delete/:id", cartController.deleteCart);
module.exports = router;
