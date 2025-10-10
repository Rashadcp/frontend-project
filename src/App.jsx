import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { CartProvider } from "./pages/CartProvider";


function App() {
  return (
    <CartProvider>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      
    </CartProvider>
  );
}

export default App;
