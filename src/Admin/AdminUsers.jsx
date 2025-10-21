import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // Toggle block/unblock user
  const handleToggleBlock = async (userId, currentlyBlocked) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, { blocked: !currentlyBlocked });
      fetchUsers();
      toast.success(!currentlyBlocked ? 'User blocked' : 'User unblocked');
    } catch (error) {
      console.error('Error updating user block status:', error);
      toast.error('Failed to update user status');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.number}</td>
                <td className="px-6 py-4">{user.blocked ? <span className="text-red-600">Blocked</span> : <span className="text-green-600">Active</span>}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleToggleBlock(user.id, !!user.blocked)}
                    className={`mr-3 ${user.blocked ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'}`}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-600">Name</label>
                <p className="font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-gray-600">Email</label>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-gray-600">Phone</label>
                <p className="font-medium">{selectedUser.number}</p>
              </div>
              <div>
                <label className="text-gray-600">Cart Items</label>
                <p className="font-medium">{selectedUser.cart?.length || 0} items</p>
              </div>
              <div>
                <label className="text-gray-600">Status</label>
                <p className="font-medium">{selectedUser.blocked ? 'Blocked' : 'Active'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleBlock(selectedUser.id, !!selectedUser.blocked)}
                  className={`px-3 py-1 rounded ${selectedUser.blocked ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                >
                  {selectedUser.blocked ? 'Unblock User' : 'Block User'}
                </button>
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="px-3 py-1 rounded bg-red-100 text-red-800"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;