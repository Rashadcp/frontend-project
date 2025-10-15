import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../pages/CartProvider";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist, user, logoutUser } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const cartCount = cart.length
  const wishlistCount = wishlist.length;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10">
      {/* Glass container */}
      <div className="bg-white/10 backdrop-blur-xl shadow-lg shadow-black/10 border border-white/20 rounded-b-3xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#b2f562] to-[#88ffcc] text-transparent bg-clip-text tracking-wide drop-shadow-md">
                REFUEL
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-white/90 font-medium">
              <Link to="/" className="hover:text-[#b2f562] transition">Home</Link>
              <Link to="/products" className="hover:text-[#b2f562] transition">Products</Link>

              {/* Cart */}
              <Link to="/cart" className="relative hover:text-[#b2f562] transition">
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#b2f562] text-black text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
<Link to="/orders" className="hover:text-[#c0daac] font-medium text-white">
  Orders
</Link>

              {/* User / Login */}
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#b2f562]">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-[#b2f562] text-black font-medium rounded-full hover:bg-white hover:text-black transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-1 bg-[#b2f562] text-black font-semibold rounded-full hover:bg-white transition"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center text-white">
              <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/10 py-4 space-y-3 px-6 text-white/90">
            <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-[#b2f562]">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-[#b2f562]">Products</Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block hover:text-[#b2f562]">Wishlist</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-[#b2f562]">Cart</Link>

            {user ? (
              <>
                <p className="text-[#b2f562]">Hi, {user.name}</p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 bg-[#b2f562] text-black rounded-full hover:bg-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full px-3 py-2 bg-[#b2f562] text-black rounded-full hover:bg-white transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
