const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Incoming Order:", req.body); // 🔥 debug

    const { items, total, address } = req.body;

    if (!items || !total || !address) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const order = new Order({
      items,
      total,
      address
    });

    const saved = await order.save();

    res.json(saved);
  } catch (err) {
    console.log("ORDER ERROR:", err); // 🔥 SEE ERROR IN TERMINAL
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;