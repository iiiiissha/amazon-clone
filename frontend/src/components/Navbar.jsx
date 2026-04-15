import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="bg-[#131921] text-white">

      {/* TOP NAV */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:text-yellow-400"
        >
          AmazonClone
        </h1>

        {/* SEARCH */}
        <div className="flex w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-black rounded-l-md outline-none"
          />
          <button className="bg-yellow-400 px-4 rounded-r-md text-black">
            🔍
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* USER */}
          <div className="text-sm leading-tight">
            <p className="text-gray-300">Hello, Isha</p>
            <p className="font-bold">Account</p>
          </div>

          {/* ORDERS */}
          <div
            onClick={() => navigate("/orders")}
            className="cursor-pointer text-sm leading-tight hover:text-yellow-400"
          >
            <p className="text-gray-300">Returns</p>
            <p className="font-bold">& Orders</p>
          </div>

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative flex items-center cursor-pointer"
          >
            <span className="text-2xl">🛒</span>

            {/* COUNT */}
            {totalItems > 0 && (
              <span className="absolute -top-2 left-4 bg-yellow-400 text-black text-xs font-bold px-2 rounded-full">
                {totalItems}
              </span>
            )}

            <span className="ml-2 font-bold">Cart</span>
          </div>

        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bg-[#232f3e] px-6 py-2 flex gap-5 text-sm">
        <p className="cursor-pointer hover:underline">All</p>
        <p className="cursor-pointer hover:underline">Electronics</p>
        <p className="cursor-pointer hover:underline">Fashion</p>
        <p className="cursor-pointer hover:underline">Home</p>
      </div>

    </div>
  );
}