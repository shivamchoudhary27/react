import React from "react";
import img from "../images/images.png";

const CardComp = (props) => {
  return (
    <>
      <div className="card">
        <img src={img} className="card-img-top" alt="images" />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            Some quick example text to build on the card title.
          </p>
        </div>
      </div> 
    </>
  );
}

export default CardComp;