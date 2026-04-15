import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      await API.post("/orders", {
        items: cart,
        address,
        totalAmount: total,
      });

      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <input
        type="text"
        placeholder="Enter address"
        className="border p-2 w-full mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-4 py-2"
      >
        Place Order
      </button>
    </div>
  );
}