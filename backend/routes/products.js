const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query);

    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;