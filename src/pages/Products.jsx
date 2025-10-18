import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartProvider";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

function Products() {
  const { addToCart, searchTerm, toggleWishlist, wishlist } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch products once
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // Compute filtered products
  let filteredProducts = products.filter(
    (p) =>
      (filterCategory === "All" || p.category === filterCategory) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1] &&
      (p.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "") || false)
  );

  // Sorting logic
  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset to page 1 when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, filterCategory, priceRange]);

  // Avoid invalid pages
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages]);

  // ✅ Always run all hooks above; handle loading/error below.
  return (
    <div className="min-h-screen bg-black py-20">
      <h1 className="text-4xl text-center text-[#00b2fe] font-extrabold mb-12">
        REFUEL Energy Drinks ⚡
      </h1>

      {/* 🧠 Loading or Error */}
      {loading ? (
        <div className="text-white text-center text-2xl mt-10">
          Loading products...
        </div>
      ) : error ? (
        <div className="text-red-500 text-center text-2xl mt-10">{error}</div>
      ) : (
        <>
          {/* Sort & Filter */}
          <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-wrap items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <label>Sort By:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-800 text-white rounded px-3 py-2"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label>Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-800 text-white rounded px-3 py-2"
              >
                <option value="All">All</option>
                <option value="Lemon">Lemon</option>
                <option value="Apple">Apple</option>
                <option value="Mango">Mango</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="max-w-7xl mx-auto grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#d8e7bf] p-4 rounded-xl shadow hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-60 w-full object-cover mb-4 rounded transition-transform duration-300 hover:scale-110"
                    />
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        wishlist.some((item) => item.id === product.id)
                          ? "bg-pink-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } hover:bg-pink-400 transition`}
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <h2 className="font-bold text-lg text-gray-900">
                    {product.name}
                  </h2>
                  <p className="font-medium mb-3 text-gray-800">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => addToCart(product)
                      
                      }
                      className="flex-1 bg-[#8dc53e] text-white py-2 rounded-lg hover:bg-[#76b431] transition flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white text-xl col-span-full">
                No products found.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <p className="text-white">
              Showing{" "}
              <span className="text-[#8dc53e] font-semibold">
                {indexOfFirstProduct + 1}
              </span>{" "}
              -{" "}
              <span className="text-[#8dc53e] font-semibold">
                {Math.min(indexOfLastProduct, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="text-[#8dc53e] font-semibold">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex gap-2">
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
        </>
      )}
    </div>
  );
}

export default Products;
