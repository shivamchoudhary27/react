import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../context/user/user';
const useAuth = () => {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  const user = { loggedIn: isLoggedIn };
  return user && user.loggedIn;
};
function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoutes;
