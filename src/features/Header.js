import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../adapters";

const List = () => {
  document.getElementById("dropdown").classList.toggle("d-none");
}
const notification_List = () => {
  document.getElementById("notification_dropdown").classList.toggle("d-none");
}
const Header = (props) => {
  const useridto = localStorage.getItem("userid");
  const [message, setMessage] = useState([]);
  
  useEffect(() => {
    let rotationInterval = setInterval(() => {
    const query = {
      wsfunction: "message_popup_get_popup_notifications",
      useridto: useridto,
    };

    getData(query)
      .then((res) => {
        if (res.status == 200 && res.data) {
          let data = [];
          res.data.notifications.map(item => {
            data.push(item.subject)
          })
          setMessage(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }, 5000)
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
          <i className="bi bi-bell-fill" onClick={notification_List}>
            <sup>{message.length}</sup>
          </i>
          <div className="notification_drop d-none " id="notification_dropdown">
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
          <img src={localStorage.getItem("profile")} style={imgStyle} />
          <span>{localStorage.getItem("name")}</span>

          {/* profile dropdown */}
          <i className="bi bi-caret-down-fill" onClick={List}></i>
          <div className="drop d-none " id="dropdown">
            <ul className="m-0 p-0">
              <li className="drop-list"><Link to="/">Profile</Link></li>
              <li className="drop-list"><Link to="/dashboard">Dashboard</Link></li>
              <li className="drop-list"><Link to="/">Logout</Link></li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
