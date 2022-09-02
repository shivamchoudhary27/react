import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = { loggedIn: localStorage.getItem('loggedIn') };
  return user && user.loggedIn;
};

function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
