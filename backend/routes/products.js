const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;

    let products;

    if (search) {
      products = await Product.find({
        name: { $regex: search, $options: "i" }
      });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;