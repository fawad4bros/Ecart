const mongoose = require("mongoose");
const cartModel = require("../models/cart");
const moment = require("moment");
const momentDT = moment().format();
const currentTime = moment(momentDT).format("HH:MM");
const currentDate = moment(momentDT).format("DD-MM-yy");

class CartController {
  constructor() {}
  getByDateTime = async (req, res) => {
    const sort = req.query.sort === "desc" ? -1 : 1;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const date = req.query.date;
    try {
      const carts = await cartModel
        .find({ date: { $eq: date } })
        .find({ time: { $gte: startTime, $lte: endTime } })

        .sort({ time: sort });
      return res.status(200).json({ getByDateTime: carts });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  /* database understand -1 for desc
     database understand 1 for asc
     “?” in URL acts as separator, it indicates end of URL resource path and start of query parameters.
      */
  getAll = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    try {
      const carts = await cartModel.find({}).limit(limit).sort({ date: sort });
      return res.status(200).json({ carts: carts });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getSingle = async (req, res) => {
    try {
      const cart = await cartModel.findOne({ _id: req.params.id });
      return res.status(200).json({ singleCart: cart });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  /*https://www.bmc.com/blogs/mongodb-operators/
      $gte	Matches if values are greater or equal to the given value.
      $lte	Matches if values are less or equal to the given value.*/
  getDateRange = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
      const carts = await cartModel
        .find({ date: { $gte: startDate, $lte: endDate } })
        .limit(limit)
        .sort({ date: sort });
      return res.status(200).json({ cartsByDate: carts });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getUserCart = async (req, res) => {
    try {
      const user = req.params.user;
      const limit = Number(req.query.limit) || 0;
      const sort = req.query.sort === "desc" ? -1 : 1;
      const result = await cartModel
        .find({ userId: user })
        .limit(limit)
        .sort({ userId: sort });
      return res.status(200).json({
        carts: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  addNewCart = async (req, res) => {
    try {
      const cart = new cartModel({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        date: currentDate,
        time: currentTime,
        products: req.body.products,
      });
      const result = await cart.save();
      return res.status(201).json({
        cart: result,
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
      console.log("filter", filter);
      const update = {
        userId: req.body.userId,
        date: currentDate,
        time: currentTime,
        products: req.body.products,
      };
      const option = { new: true };
      const result = await cartModel.findOneAndUpdate(filter, update, option);
      return res.status(200).json({
        cart: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const result = await cartModel.findOneAndRemove({ _id: req.params.id });
      return res.status(200).json({
        cart: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}
module.exports = new CartController();
