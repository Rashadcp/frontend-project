import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartProvider";
import { Link } from "react-router-dom";


function OrderDetails() {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/orders?userEmail=${user.email}`)
      .then((res) => {
        setOrders(res.data.reverse()); 
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, [user]);

  if (!user)
    return (
  <div>
      <div className="min-h-screen bg-black text-white flex justify-center items-center text-xl">
        ⚠️ Please login to view your orders 
        <Link path={"/login"} > login</Link>
      </div>
      
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center text-xl">
        Loading your orders...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black text-red-500 flex justify-center items-center text-xl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#8dc53e] mb-10">
        My Orders 🛍️
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No orders found.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg border border-gray-800 hover:shadow-[#00b2fe60] transition-all"
            >
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-sm font-medium mt-1 ${
                      order.status === "Delivered"
                        ? "text-green-400"
                        : order.status === "Processing"
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
                <p className="text-lg font-semibold text-[#8dc53e] self-center">
                  Total: ₹{order.total}
                </p>
              </div>

              <div className="mt-4 border-t border-gray-700 pt-4 grid gap-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 bg-[#111] p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#8dc53e] font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
