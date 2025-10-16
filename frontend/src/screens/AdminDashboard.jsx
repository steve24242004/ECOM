import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/users" className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg transition-colors">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p>View, edit, and delete users</p>
          </div>
        </Link>
        
        <Link to="/admin/products" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-lg transition-colors">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
            <p>Add, edit, and delete products</p>
          </div>
        </Link>
        
        <Link to="/admin/orders" className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-lg transition-colors">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
            <p>View and update order status</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;