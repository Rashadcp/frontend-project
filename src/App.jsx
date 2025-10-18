import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./pages/CartProvider";
import Payment from "./pages/Payment";
import Address from "./pages/Address";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Admin/AdminDashboard";

// 👇 Sub-component to use useLocation
function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/address" element={<Address />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<OrderDetails />} />


        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="products" element={<AdminProducts />} />
           <Route path="orders" element={<AdminOrders />} />
         <Route path="users" element={<AdminUsers />} />
      </Route>



       
      </Routes>
    </>
  );
}

function App() {
  return (
    
      <CartProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <AppContent /> 
      </CartProvider>
    
  );
}

export default App;
