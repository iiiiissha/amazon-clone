const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  address: String,
  totalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);