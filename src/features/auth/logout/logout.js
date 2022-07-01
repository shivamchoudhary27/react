import { useNavigate } from "react-router-dom";
import NavLinkItem from "../../../components/navitem";
import config from "../../../utils/config";

const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    config.WSTOKEN = null;
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="nav-link" onClick={logoutHandler}>
      <NavLinkItem itemName="Logout" iconClass="bi bi-power nav-link-icon" itemNameClass="nav-link-name" />
    </div>
  );
};

export default Logout;
