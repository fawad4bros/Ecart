const express = require("express");
const router = express.Router();
const {
  getAll,
  getSingle,
  getDateRange,
  getUserCart,
  addNewCart,
  updateCart,
  deleteCart,
  getByDateTime,
} = require("../controllers/cartControllers");
router.get("/", getAll);
router.get("/byDate/", getDateRange);
router.get("/byDateTime/", getByDateTime);
router.get("/:id", getSingle);
// Question: byDate api does not work under the getSingle
//router.get("/byDate/", getDateRange);
router.get("/user/:user", getUserCart);
router.post("/add", addNewCart);
router.put("/:id", updateCart);
router.delete("/delete/:id", deleteCart);
module.exports = router;
