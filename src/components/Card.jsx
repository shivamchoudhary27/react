import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to="/" className="btn btn-warning">
            Explore
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;