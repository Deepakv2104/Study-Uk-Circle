import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../userProvider/AuthProvider';

function PrivateRoute({ element: Element, role, ...rest }) {
  const { userRole ,currentUser} = useAuth();
  console.log("PrivateRoute currentUser:", currentUser);
  console.log("from auth:", userRole);
  console.log("from app:", role);

  // Check if currentUser exists and has the required role
  const isAuthenticated = currentUser && userRole=== role;
console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/blank" />;
}

export default PrivateRoute;
