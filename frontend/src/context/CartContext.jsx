import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(""); // 🔥 popup state

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // 🔥 show popup
    setMessage("Item added to cart ✅");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const updateQuantity = (id, type) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        return {
          ...item,
          quantity: type === "inc"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, message }}
    >
      {children}
    </CartContext.Provider>
  );
}