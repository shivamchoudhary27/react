import React, { useState, useEffect, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import UserContext from "./context/user/user";
import { getData } from "../adapters";
import config from "../utils/config";

const List = () => {
  document.getElementById("dropdown").classList.toggle("d-none");
}
const notification_List = () => {
  document.getElementById("notification_dropdown").classList.toggle("d-none");
}
window.onclick = function(event) {
  if (!event.target.matches('.d-btn')) {
    var dropdowns = document.getElementsByClassName("d-css");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (!openDropdown.classList.contains('d-none')) {
        openDropdown.classList.add('d-none');
      }
    }
  }
}
const Header = (props) => {
  const useridto = localStorage.getItem("userid");
  const [message, setMessage] = useState([]);
  const userctx = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      userctx.setUserOff({ userAuth: {}, userInfo: {} });
      config.WSTOKEN = null;
      localStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    // let rotationInterval = setInterval(() => {
    const query = {
      wsfunction: "message_popup_get_popup_notifications",
      useridto: useridto,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log("Something went wrong");
          }
          else {
            let data = [];
            res.data.notifications.map(item => (
              data.push(item.subject)
            ))
            setMessage(data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
      // });
    // }, 5000)
  }, []);

  const imgStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  };
  return (
    <>
      <header className={`header ${props.currentState ?? null}`}>
        <div className="header-toggle" onClick={props.toggleFun}>
          <i className="bi bi-list"></i>
        </div>
        <div className="header-avatar">

          {/* notification dropdown */}
          <i className=" d-btn bi bi-bell-fill" onClick={notification_List}>
            <sup>{message.length}</sup>
          </i>
          <div className="d-css notification_drop d-none " id="notification_dropdown">
            <ul className="m-0 p-0 drop-lists">
              {
                message.map((item) => (
                  <li key={Math.random()}>{item}</li>
                ))
              }
            </ul>
          </div>

          {/* chat dropdown */}
          <i className="bi bi-chat-fill"></i>
          <img src={localStorage.getItem("profile")} style={imgStyle} alt=""></img> 
          <span>{localStorage.getItem("fullname")}</span>

          {/* profile dropdown */}
          <i className=" d-btn bi bi-caret-down-fill" onClick={List}></i>
          <div className=" d-css drop d-none " id="dropdown">
            <ul className="m-0 p-0">
              <li className="drop-list">Profile</li>
              <li className="drop-list">Dashboard</li>
              <li className="drop-list" onClick={logoutHandler}><Link to="#">Logout</Link></li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
