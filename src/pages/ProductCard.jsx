function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white">
      {/* Image Section */}
      <div className="w-full h-64 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover" // 👈 this fills perfectly
        />
      </div>

      {/* Details Section */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-1">₹{product.price}</p>
        <button className="mt-3 bg-[#8dc53e] text-white px-4 py-2 rounded hover:bg-[#76b431] transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
