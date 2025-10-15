import { useContext } from "react";
import { CartContext } from "./CartProvider";

function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">No items in wishlist ❤️</h2>
        <p className="text-gray-400">Add some products to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <h1 className="text-white text-3xl text-center font-bold mb-10 py-10">Your Wishlist</h1>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-[#c2d6aa] p-3 rounded-lg shadow-lg flex flex-col">
            <img
              src={item.image}
              alt={item.name}
              className="h-56 w-full object-cover rounded mb-3"
            />
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-sm mb-2">₹{item.price.toFixed(2)}</p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-[#8dc53e] text-white py-2 rounded hover:bg-[#76b431]"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
