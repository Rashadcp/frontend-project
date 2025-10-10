import { useContext } from "react";
import { CartContext } from "./CartProvider";

const productData = [
  { id: 1, name: "Energy Drink - Lemon", price: 130, image: "lemon.png" },
  { id: 2, name: "Energy Drink - Apple", price: 150, image: "apple.png" },
  { id: 3, name: "Energy Drink - Mango", price: 150, image: "mango.png" },
  { id: 4, name: "Energy Drink - Ginger Elanchi", price: 160, image: "gingerelanchi.png" },
  { id: 5, name: "Energy Drink - Chocolate", price: 170, image: "chocolate.png" },
  { id: 6, name: "Energy Drink - Coconut", price: 160, image: "coconut.png" },
  { id: 7, name: "Energy Drink - Green Apple", price: 170, image: "greenapple.png" },
  { id: 8, name: "Energy Drink - Lemon Lime", price: 140, image: "lemonlime.png" },
  { id: 9, name: "Energy Drink - Lyche", price: 150, image: "lichi.png" },
  { id: 10, name: "Energy Drink - Mint", price: 110, image: "mint.png" },
  { id: 11, name: "Energy Drink - Eligote", price: 210, image: "eligote.jpg" },
  { id: 12, name: "Energy Drink - Refuel Legend", price: 310, image: "refuellegend.jpg" },
  { id: 13, name: "Energy Drink - Special Dynamite", price: 310, image: "specialdynamite.jpg" },
];

function Products() {
  const { addToCart, addToWishlist } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-black py-20">
      <h1 className="text-3xl text-center text-white font-bold mb-10">REFUEL Energy Drinks ⚡</h1>

      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-[#c2d6aa] p-3 rounded-lg shadow hover:shadow-xl transition-transform duration-300 transform hover:scale-105 flex flex-col"
          >
            <div className="overflow-hidden rounded">
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover mb-4 rounded transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="font-medium mb-2">₹{product.price.toFixed(2)}</p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#8dc53e] text-white py-2 rounded hover:bg-[#76b431] transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="flex-1 bg-[#25501f] text-white py-2 rounded hover:bg-[#c0392b] transition"
              >
                ❤️ Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
