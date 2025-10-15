import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-500 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;