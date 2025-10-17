import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import Loader from './Loader';
import Message from './Message';

const ProductList = ({ isAdmin = false, onEdit, onDelete }) => {
  const { products, loading, error } = useSelector((state) => state.products);

  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="relative">
          <Product product={product} />
          {isAdmin && (
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;