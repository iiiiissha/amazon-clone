const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place Order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;