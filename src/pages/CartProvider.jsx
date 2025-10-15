import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const initializeUserCart = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setCart([]);
    setWishlist([]);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
    setWishlist([]);
  };

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

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: (p.quantity || 1) - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        user,
        cart,
        wishlist,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        initializeUserCart,
        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
