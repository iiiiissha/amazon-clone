import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            {order.items.map((item, i) => (
              <p key={i}>{item.name} x {item.quantity}</p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}