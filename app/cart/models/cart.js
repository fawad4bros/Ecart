const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", schema);
module.exports.Cart = Cart;
