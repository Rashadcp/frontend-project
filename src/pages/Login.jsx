import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartProvider"; // ✅ Import context

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { initializeUserCart } = useContext(CartContext); // ✅ from provider

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // ✅ Initialize empty cart for this user
        initializeUserCart(user);

        navigate("/products");
      } else {
        setErrorMessage("User not found. Please register first!");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="p-8 rounded-lg shadow-lg w-full max-w-md bg-cover bg-center"
        style={{ backgroundImage: 'url("/register.png")' }}
      >
        <h2 className="text-2xl font-bold text-center text-[#8dc53e] mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8dc53e] bg-[#b4bca8]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8dc53e] bg-[#b4bca8]"
          />

          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="bg-[#8dc53e] text-white py-2 rounded hover:bg-[#76b431] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-white">
          Don't have an account?{" "}
          <a href="/register" className="text-[#8dc53e] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
