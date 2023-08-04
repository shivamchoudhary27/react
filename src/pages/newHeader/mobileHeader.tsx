import React from "react";
import Logo from "../../assets/images/logo.png";

type Props = {};

const MobileHeader = (props: Props) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Logo" width={100} />
        <div>
          <ul
            style={{
              display: "flex",
              justifyContent:"space-evenly",
              alignItems: "center",
              listStyle: "none",
              paddingLeft: "0px"
            }}
          >
            <li className="me-2"><i className="fa-solid fa-magnifying-glass"></i></li>
            <li className="me-2"><i className="fa-solid fa-bell"></i></li>
            <li className="me-2"><i className="fa-solid fa-user"></i></li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobileHeader;
