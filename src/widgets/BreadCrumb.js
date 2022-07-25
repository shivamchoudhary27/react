import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  return (
    <>
      <div className="container-fluid page-box">
        <div className="card" id="height1">
          <div className="card-body">
            <div className="card-title">
              <h2> {props.title}</h2>
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
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BreadCrumb;
