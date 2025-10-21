import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminOverview() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/orders'),
          axios.get('http://localhost:5000/products'),
        ]);
        setOrders(ordersRes.data || []);
        setProducts(productsRes.data || []);
      } catch (err) {
        console.error('Failed to fetch analytics data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading analytics...</div>;

  // Compute metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

  // Orders by status
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  // Top products (by quantity sold)
  const productSales = {};
  orders.forEach(o => {
    (o.items || []).forEach(it => {
      productSales[it.name] = (productSales[it.name] || 0) + (it.quantity || 0);
    });
  });

  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Recent orders
  const recentOrders = orders.slice().reverse().slice(0, 5);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-semibold">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">₹{totalRevenue}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Avg Order Value</p>
          <p className="text-2xl font-semibold">₹{avgOrderValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Orders by Status</h3>
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex justify-between py-1">
              <span className="text-sm">{status}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Top Products</h3>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No sales data yet</p>
          ) : (
            topProducts.map(([name, qty]) => (
              <div key={name} className="flex justify-between py-1">
                <span className="text-sm">{name}</span>
                <span className="font-medium">{qty}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No recent orders</p>
        ) : (
          recentOrders.map((o) => (
            <div key={o.id} className="flex justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium">Order #{o.id}</p>
                <p className="text-sm text-gray-500">{o.user} • {o.items?.length || 0} items</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{o.totalAmount}</p>
                <p className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOverview;