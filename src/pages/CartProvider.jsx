import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  // Initialize user synchronously from localStorage to avoid a flash redirect
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  // When user is available (including after refresh), fetch their cart
  useEffect(() => {
    if (user && user.email) {
      fetchUserCart(user.email);
    }
  }, [user]);

  // Check if user is logged in
  const isLoggedIn = () => {
    return !!user;
  };

  // Check if user is admin
  const isAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true';
  };

  // Fetch cart from db.json based on logged-in user
  const fetchUserCart = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${email}`);
      if (res.data.length > 0 && res.data[0].cart) {
        setCart(res.data[0].cart);
      }
    } catch (err) {
      console.error("Error fetching user cart:", err);
    }
  };

  // Save updated cart in db.json
  const saveUserCart = async (email, updatedCart) => {
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${email}`);
      if (res.data.length > 0) {
        const userId = res.data[0].id;
        await axios.patch(`http://localhost:5000/users/${userId}`, {
          cart: updatedCart,
        });
      }
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  // When a new user logs in
  const initializeUserCart = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    fetchUserCart(loggedInUser.email);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
    setWishlist([]);
  };

  // --- CART OPERATIONS ---
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + qty } : p
        );
      } else {
        updated = [...prev, { ...product, quantity: qty }];
      }

      if (user) saveUserCart(user.email, updated);
      return updated;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) => {
      const updated = prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: (p.quantity || 1) - 1 } : p
        )
        .filter((p) => p.quantity > 0);
      if (user) saveUserCart(user.email, updated);
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (user) saveUserCart(user.email, updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (user) saveUserCart(user.email, []);
  };

  const addToWishlist = (product) => {
  setWishlist((prev) => {
    if (prev.some((p) => p.id === product.id)) return prev;
    return [...prev, product];
  });
};

const removeFromWishlist = (id) => {
  setWishlist((prev) => prev.filter((p) => p.id !== id));
};

const toggleWishlist = (product) => {
  setWishlist((prev) =>
    prev.some((p) => p.id === product.id)
      ? prev.filter((p) => p.id !== product.id)
      : [...prev, product]
  );
};

const [searchTerm, setSearchTerm] = useState("");
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
        searchTerm,
        toggleWishlist,
    setSearchTerm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
