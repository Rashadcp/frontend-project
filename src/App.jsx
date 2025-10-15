import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./pages/CartProvider";
import Payment from "./pages/Payment";
import Address from "./pages/Address";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <CartProvider>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address" element={<Address />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrderDetails />} />
        </Routes>
     
    </CartProvider>
  );
}

export default App;
