require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Routes
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

// ✅ Use routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔥 Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});