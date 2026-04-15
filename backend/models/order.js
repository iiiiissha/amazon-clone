const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  address: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);