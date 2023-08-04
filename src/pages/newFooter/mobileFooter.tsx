import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const MobileFooter = (props: Props) => {
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <ul
          style={{
            paddingLeft: "0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {footerList.map((list, index) => (
            <Link to={list.link}>
              <li key={index} style={{ listStyle: "none" }}>
                {list.icon}
                <p>{list.title}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MobileFooter;

const footerList = [
  {
    icon: <i className="fa-solid fa-gauge"></i>,
    title: "Dashboard",
    link: "#",
  },
  {
    icon: <i className="fa-solid fa-calendar-days"></i>,
    title: "Calander",
    link: "#",
  },
  {
    icon: <i className="fa-solid fa-calendar-days"></i>,
    title: "Gradebook",
    link: "#",
  },
  {
    icon: <i className="fa-solid fa-calendar-days"></i>,
    title: "Performance",
    link: "#",
  },
  {
    icon: <i className="fa-solid fa-bars"></i>,
    title: "Menu",
    link: "#",
  },
];
