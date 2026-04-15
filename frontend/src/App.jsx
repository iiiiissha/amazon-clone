import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function App() {
  const { showToast } = useContext(CartContext);

  return (
    <BrowserRouter>

      <Navbar />

      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
          Item added to cart ✅
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;