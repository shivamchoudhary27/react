import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="nav-link" onClick={logoutHandler}>
      <i className="bi bi-power nav-link-icon"></i>
      <span className="nav-link-name">Logout</span>
    </div>
  );
};

export default Logout;
