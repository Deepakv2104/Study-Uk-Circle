import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../userProvider/AuthProvider';

function PrivateRoute({ element: Element, role, ...rest }) {
  const { userRole ,currentUser} = useAuth();
  console.log("PrivateRoute currentUser:", currentUser);
  console.log("PrivateRoute role:", userRole);
  console.log("PrivateRoute role:", role);

  // Check if currentUser exists and has the required role
  const isAuthenticated = currentUser && userRole=== role;
console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
