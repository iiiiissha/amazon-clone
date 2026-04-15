require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "iPhone 15",
    description: "Latest Apple smartphone",
    price: 79999,
    category: "electronics",
    images: ["https://via.placeholder.com/200"],
    stock: 10
  },
  {
    name: "Nike Shoes",
    description: "Running shoes",
    price: 2999,
    category: "fashion",
    images: ["https://via.placeholder.com/200"],
    stock: 20
  },
  {
    name: "Laptop",
    description: "Gaming laptop",
    price: 59999,
    category: "electronics",
    images: ["https://via.placeholder.com/200"],
    stock: 5
  }
];

async function seed() {
  try {
    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);
    console.log("Data Seeded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

seed();