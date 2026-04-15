import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#eaeded] min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-5">Shopping Cart</h2>

      <div className="flex gap-6">

        <div className="flex-1 space-y-4">
          {cart.map(item => (
            <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => updateQuantity(item._id, "dec")}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, "inc")}>+</button>
                </div>
              </div>

              <button onClick={() => removeFromCart(item._id)}>
                Remove
              </button>

            </div>
          ))}
        </div>

        <div className="w-64 bg-white p-4 rounded shadow">
          <p>Total: ₹{total}</p>

          <button
            className="bg-yellow-400 w-full mt-3 py-2 rounded"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}