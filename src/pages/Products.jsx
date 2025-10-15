import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartProvider";
import { FaShoppingCart } from "react-icons/fa";

function Products() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // New states for filter & sort
  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-2xl">
        {error}
      </div>
    );

  // 🧮 Filter + Sort logic
  let filteredProducts = products.filter(
    (p) =>
      (filterCategory === "All" || p.category === filterCategory) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // ------------Pagination---------------
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-black py-20">
      <h1 className="text-4xl text-center text-[#00b2fe] font-extrabold mb-12">
        REFUEL Energy Drinks ⚡
      </h1>


      {/* Filter & Sort Bar */}

      <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <label>Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-800 text-white rounded px-3 py-2">
            <option value="">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#d8e7bf] p-4 rounded-xl shadow hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 flex flex-col"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover mb-4 rounded transition-transform duration-300 hover:scale-110"
              />
            </div>

            <h2 className="font-bold text-lg text-gray-900">{product.name}</h2>
            <p className="font-medium mb-3 text-gray-800">₹{product.price}</p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#8dc53e] text-white py-2 rounded-lg hover:bg-[#76b431] transition flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-[#00b2fe] text-white rounded-lg hover:bg-[#0092d1] disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-[#8dc53e] text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-[#00b2fe] text-white rounded-lg hover:bg-[#0092d1] disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
