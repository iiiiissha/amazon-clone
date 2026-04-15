import { useEffect, useState, useContext } from "react";
import { API } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  useEffect(() => {
    API.get(`/products${search ? `?search=${search}` : ""}`)
      .then((res) => setProducts(res.data))
      .catch(console.log);
  }, [search]);

  return (
    <div className="bg-[#eaeded] min-h-screen p-6 flex justify-center">
      <div className="max-w-7xl w-full">

        <img
          src="https://dummyimage.com/1200x300/cccccc/000000&text=Amazon+Clone"
          className="w-full h-64 object-cover rounded mb-6"
        />

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Deals for you
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded shadow hover:shadow-xl hover:scale-105 transition cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={p.images?.[0] || "https://dummyimage.com/200x200/cccccc/000000&text=No+Image"}
                  className="h-40 object-contain mx-auto"
                />

                <h3 className="text-sm mt-2 line-clamp-2">{p.name}</h3>

                <p className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</p>

                <p className="text-lg font-bold mt-2">₹{p.price}</p>

                <button
                  className="bg-yellow-400 w-full mt-3 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}