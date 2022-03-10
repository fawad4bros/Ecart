const mongoose = require("mongoose");
const dateTime = require("node-datetime");
const dt = dateTime.create();
const cartModel = require("../models/cart");

const getByDateTime = async (req, res) => {
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

const getAll = async (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort === "desc" ? -1 : 1;
  // database understand -1 for desc
  // database understand 1 for asc
  try {
    const carts = await cartModel.find({}).limit(limit).sort({ date: sort });
    return res.status(200).json({ carts: carts });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ _id: req.params.id });
    return res.status(200).json({ singleCart: cart });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getDateRange = async (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort === "desc" ? -1 : 1;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  try {
    //https://www.bmc.com/blogs/mongodb-operators/
    // $gte	Matches if values are greater or equal to the given value.
    // $lte	Matches if values are less or equal to the given value.
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

const getUserCart = async (req, res) => {
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

const addNewCart = async (req, res) => {
  const date = dt.format("d-m-Y");
  const time = dt.format("H:M");
  try {
    const cart = new cartModel({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId,
      date: date,
      time: time,
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

const updateCart = async (req, res) => {
  console.log("req.params.id", req.params.id);
  const date = dt.format("H:M d-m-Y");
  try {
    const filter = { _id: req.params.id };
    console.log("filter", filter);
    const update = {
      userId: req.body.userId,
      date: date,
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

const deleteCart = async (req, res) => {
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

module.exports = {
  getAll,
  getSingle,
  getDateRange,
  getUserCart,
  addNewCart,
  updateCart,
  deleteCart,
  getByDateTime,
};
