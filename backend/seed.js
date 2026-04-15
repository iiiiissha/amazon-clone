require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany();
    await Product.insertMany([
      {
        name: "iPhone 15",
        description: "Latest Apple smartphone",
        price: 79999,
        category: "electronics",
        image: "https://via.placeholder.com/200",
        stock: 10
      },
      {
        name: "Nike Shoes",
        description: "Running shoes",
        price: 2999,
        category: "fashion",
        image: "https://via.placeholder.com/200",
        stock: 20
      },
      {
        name: "Laptop",
        description: "Gaming laptop",
        price: 59999,
        category: "electronics",
        image: "https://via.placeholder.com/200",
        stock: 5
      }
    ]);

    console.log("Data Seeded ✅");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

seed();