import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../pages/CartProvider";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist } = useContext(CartContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#263d17] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#c0daac]">
            <img src="/logo.png" alt="Logo" style={{ height: "50px", width: "150px" }} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-[#c0daac] font-medium text-white">Home</Link>
            <Link to="/products" className="hover:text-[#c0daac] font-medium text-white">Products</Link>
            <Link to="/about" className="hover:text-[#c0daac] font-medium text-white">About Us</Link>

            <Link to="/wishlist" className="text-red-500 hover:text-red-600 flex items-center">
              <FaHeart size={20} /> {wishlist.length > 0 && <span className="ml-1 text-sm">{wishlist.length}</span>}
            </Link>

            <Link to="/cart" className="text-white hover:text-[#c0daac] flex items-center">
              <FaShoppingCart size={20} /> {cart.length > 0 && <span className="ml-1 text-sm">{cart.reduce((acc, p) => acc + p.quantity, 0)}</span>}
            </Link>

            <Link to="/login" className="text-white px-3 py-1 border rounded hover:bg-[#c0daac] hover:text-white">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg- px-4 py-3 shadow">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-[#c0daac]">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-[#c0daac] text-white">Products</Link>
          <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center text-red-500 hover:text-red-600 w-full">
            Wishlist <FaHeart className="ml-2" /> {wishlist.length > 0 && <span className="ml-1">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center text-white hover:text-[#365f16] w-full">
            Cart <FaShoppingCart className="ml-2" /> {cart.length > 0 && <span className="ml-1">{cart.reduce((acc, p) => acc + p.quantity, 0)}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
