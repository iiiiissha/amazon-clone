import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage (persist data)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // ✅ REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // ✅ INCREASE QUANTITY
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ DECREASE QUANTITY
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ✅ CLEAR CART (after order)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}