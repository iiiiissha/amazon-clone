import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/api";
import { CartContext } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.log);
  }, [id]);

  if (!product) return <h2 className="p-5">Loading...</h2>;

  return (
    <div className="bg-[#eaeded] min-h-screen p-10 flex justify-center">

  <div className="bg-white p-8 rounded shadow flex gap-10 max-w-5xl w-full">

    <img
      src={product.images[0]}
      className="w-80 object-contain"
    />

    <div className="flex flex-col justify-between">

      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>

        <p className="text-gray-600 mt-3">
          {product.description}
        </p>

        <p className="text-3xl text-green-600 font-bold mt-4">
          ₹{product.price}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <button
          className="bg-yellow-400 py-2 rounded hover:bg-yellow-500"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
          Buy Now
        </button>
      </div>

    </div>
  </div>
</div>
  );
}