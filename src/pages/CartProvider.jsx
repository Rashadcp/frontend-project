import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  const initializeUserCart = (loggedInUser) => {
    setUser(loggedInUser);
    setCart([]);
    setWishlist([]);
  };

  // Add item or increase quantity
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 1) + qty }
            : p
        );
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: (p.quantity || 1) - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        user,
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        addToWishlist,
        initializeUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
