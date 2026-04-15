import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");

  // 🔥 FIX: total quantity
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-[#131921] text-white px-6 py-3 flex items-center justify-between shadow">

      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        amazon<span className="text-yellow-400">.clone</span>
      </h1>

      {/* Search */}
      <div className="flex w-1/2">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 text-black rounded-l outline-none"
        />
        <button
          className="bg-yellow-400 px-4 rounded-r"
          onClick={() => navigate(`/?search=${search}`)}
        >
          🔍
        </button>
      </div>

      {/* Cart with FIXED count */}
      <div
        className="relative cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        Cart 🛒

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
            {totalItems}
          </span>
        )}
      </div>

    </div>
  );
}