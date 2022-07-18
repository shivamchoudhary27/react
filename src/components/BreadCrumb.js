import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {props.breadcrumbItem.map((item, index) =>
            item[2] === false ? (
              <li key={index} className="breadcrumb-item">
                {item[0]}
              </li>
            ) : (
              <li key={index} className="breadcrumb-item">
                <Link to={item[1]}>{item[0]}</Link>
              </li> 
            )
          )}
        </ol>
      </nav>
    </>
  );
};

export default BreadCrumb;
