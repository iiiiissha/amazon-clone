import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);

    if (exist) {
      setCart(cart.map(x =>
        x._id === product._id ? { ...x, quantity: x.quantity + 1 } : x
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, type) => {
    setCart(cart.map(item =>
      item._id === id
        ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1)
          }
        : item
    ));
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}