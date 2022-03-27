const { Cart } = require("../models/cart");
const { Product } = require("../../product/models/products");
const moment = require("moment");

const momentDT = moment().format();
const currentTime = moment(momentDT).format("HH:MM");
const currentDate = moment(momentDT).format("DD-MM-yy");

class CartController {
  constructor() {}

  getCartsByDateTime = async (req, res) => {
    const sort = req.query.sort === "desc" ? -1 : 1;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const date = req.query.date;
    try {
      const result = await Cart.find({ date: { $eq: date } })
        .find({ time: { $gte: startTime, $lte: endTime } })
        .sort({ time: sort });
      return res.status(200).json({ carts: result });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getCarts = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    try {
      const result = await Cart.find({}).limit(limit).sort({ date: sort });
      return res.status(200).json({ carts: result });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getCart = async (req, res) => {
    try {
      const result = await Cart.findOne({ _id: req.params.id });
      return res.status(200).json({ cart: result });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  /**
   * https://www.bmc.com/blogs/mongodb-operators/
   * @$gte Matches if values are greater or equal to the given value
   * @$lte Matches if values are less or equal to the given value
   */
  getcartsByDateRange = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
      const result = await Cart.find({
        date: { $gte: startDate, $lte: endDate },
      })
        .limit(limit)
        .sort({ date: sort });
      return res.status(200).json({ carts: result });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getUserCart = async (req, res) => {
    try {
      const id = req.params.id;
      const limit = Number(req.query.limit) || 0;
      const sort = req.query.sort === "desc" ? -1 : 1;
      const result = await Cart.find({ userId: id })
        .limit(limit)
        .sort({ userId: sort });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  addCart = async (req, res) => {
    try {
      await Cart.create({
        userId: req.body.userId,
        date: currentDate,
        time: currentTime,
        products: req.body.products,
      });
      return res.status(201).json({
        message: `Cart Successfully Created`,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  updateCart = async (req, res) => {
    try {
      const filter = { _id: req.params.id };
      const update = {
        userId: req.body.userId,
        date: currentDate,
        time: currentTime,
        products: req.body.products,
      };
      await Cart.findOneAndUpdate(filter, update);
      return res.status(200).json({
        message: "Cart Successfully Updated",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  deleteCart = async (req, res) => {
    try {
      await Cart.findOneAndRemove({ _id: req.params.id });
      return res.status(200).json({
        message: "Cart Successfully Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  deleteAllCarts = async (req, res) => {
    try {
      await Cart.deleteMany({});
      return res.status(200).json({
        message: "Cart-Collection Successfully Emptied",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  userPreviousOrders = async (req, res) => {
    try {
      const productsDetail = await Cart.find({
        $match: { userId: req.params.id },
      }).populate({ path: "products.productId" });
      // ,
      // { products: 1, _id: 0 }
      // .populate({ path: "products.productId" });
      return res.status(200).json(productsDetail);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}
module.exports = new CartController();
