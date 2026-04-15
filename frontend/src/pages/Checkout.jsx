import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { API } from "../services/api";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!address) return alert("Enter address");

    try {
      // 🔥 FIXED: send only required fields
      const formattedItems = cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const res = await API.post("/orders", {
        items: formattedItems,
        total,
        address
      });

      setOrderId(res.data._id);
      setOrderPlaced(true);

    } catch (err) {
      console.log(err);
    }
  };

  if (orderPlaced) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-600">
          Order Placed Successfully 🎉
        </h2>
        <p className="mt-2">
          Order ID: <span className="font-bold">{orderId}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#eaeded] min-h-screen p-6 flex justify-center">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">

        <h2 className="text-xl font-semibold mb-4">Checkout</h2>

        <textarea
          placeholder="Enter shipping address"
          className="w-full border p-2 mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <p className="text-lg font-semibold mb-3">
          Total: ₹{total}
        </p>

        <button
          className="bg-green-500 text-white w-full py-2 rounded"
          onClick={handleOrder}
        >
          Place Order
        </button>

      </div>
    </div>
  );
}