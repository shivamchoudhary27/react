import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLinkItem from '../../../widgets/navitem';
import config from '../../../utils/config';
import UserContext from '../../context/user/user';

function Logout() {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      userctx.setUserOff({ userAuth: {}, userInfo: {} });
      config.WSTOKEN = null;
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('fullname');
      localStorage.removeItem('userid');
      localStorage.removeItem('name');
      localStorage.removeItem('profile');
      navigate('/');
    }
  };

  return (
    <div className="nav-link" onClick={logoutHandler}>
      <NavLinkItem itemName="Logout" iconClass="bi bi-power nav-link-icon" itemNameClass="nav-link-name" />
    </div>
  );
}

export default Logout;
