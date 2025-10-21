import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#8dc53e] text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:bg-green-700 p-2 rounded">Overview</Link>
          <Link to="/admin/products" className="hover:bg-green-700 p-2 rounded">Products</Link>
          <Link to="/admin/orders" className="hover:bg-green-700 p-2 rounded">Orders</Link>
          <Link to="/admin/users" className="hover:bg-green-700 p-2 rounded">Users</Link>
          <Link to="/" className="hover:bg-green-700 p-2 rounded">Back to Shop</Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <Outlet /> 
      </div>
    </div>
  );
}

export default AdminDashboard;
