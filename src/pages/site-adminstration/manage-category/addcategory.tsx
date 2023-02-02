import React from "react";
import { Link } from "react-router-dom";

const Addcategory = () => {
  return (
    <>
      <div>
        <Link to="" style={{textDecoration: 'none'}}>
          <i className="fa-solid fa-square-plus"></i>{" "}
          <strong>Add Category</strong>{" "}
        </Link>
      </div>
    </>
  );
};

export default Addcategory;
