import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;