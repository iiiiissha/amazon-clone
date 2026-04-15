import { useEffect, useState, useContext } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/products?category=${category}`)
      .then(res => setProducts(res.data))
      .catch(console.log);
  }, [category]);

  return (
    <div className="bg-[#eaeded] min-h-screen p-6">

      <select
        className="mb-4 p-2 border"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>All</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Books</option>
      </select>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-white p-3 rounded shadow">

            <img
              src={p.images?.[0] || "https://dummyimage.com/200"}
              className="h-32 mx-auto"
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              className="bg-yellow-400 w-full mt-2"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}