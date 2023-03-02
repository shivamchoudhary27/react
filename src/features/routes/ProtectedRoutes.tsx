import { log } from 'console';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../context/user/user';
const useAuth = () => {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  const user = { loggedIn: isLoggedIn };
  return user && user.loggedIn;
};

const useAdmin = () => {
  const userCtx = useContext(UserContext);
  const userSiteAdmin = userCtx.userInfo.userissiteadmin ?? 'false';
  const isLoggedIn = userCtx.isLoggedIn;
  return (userSiteAdmin === 'true'  && isLoggedIn === true) ? true : false;
};

function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

function ProtectedAdminRoutes() {
  const isAdmin = useAdmin();
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
}


export { ProtectedRoutes, ProtectedAdminRoutes };
