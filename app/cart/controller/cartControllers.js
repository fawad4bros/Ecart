const mongoose = require("mongoose");
const { Cart } = require("../models/cart");
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
      const result = await Cart.find({ date: { $eq: date } })
        .find({ time: { $gte: startTime, $lte: endTime } })

        .sort({ time: sort });
      return res.status(200).json({ carts: result });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
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
      const result = await Cart.find({}).limit(limit).sort({ date: sort });
      return res.status(200).json({ carts: result });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  getSingle = async (req, res) => {
    try {
      const result = await Cart.findOne({ _id: req.params.id });
      return res.status(200).json({ cart: result });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };
  /*
  https://www.bmc.com/blogs/mongodb-operators/
      @gte:	
      Matches if values are greater or equal to the given value.
      $lte	Matches if values are less or equal to the given value.
      */
  getDateRange = async (req, res) => {
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
        message: "Something went wrong " + error,
      });
    }
  };

  getUserCart = async (req, res) => {
    try {
      const user = req.params.user;
      const limit = Number(req.query.limit) || 0;
      const sort = req.query.sort === "desc" ? -1 : 1;
      const result = await Cart.find({ userId: user })
        .limit(limit)
        .sort({ userId: sort });
      return res.status(200).json({
        carts: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  addNewCart = async (req, res) => {
    try {
      const cart = await Cart.create({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        date: currentDate,
        time: currentTime,
        products: req.body.products,
      });
      await cart.save();
      return res.status(201).json({
        message: "Cart Successfully Created",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
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
      const option = { new: true };
      await Cart.findOneAndUpdate(filter, update, option);
      return res.status(200).json({
        message: "Cart Successfully Updated",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
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
        message: "Something went wrong " + error,
      });
    }
  };
}
module.exports = new CartController();
