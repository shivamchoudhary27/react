import React from "react";
import "./style.scss";

const StarRating = ({ totalStars, currentRating, onStarClick = () => {} }: any) => {
  const stars = [];

  // Generate an array of star elements
  for (let i = 1; i <= totalStars; i++) {
    const starClassName = i <= currentRating ? "bi bi-star-fill" : "bi bi-star";

    stars.push(
      <span
        key={i}
        className={starClassName}
        onClick={() => onStarClick(i)}
      ></span>
    );
  }

  return (
    <div className="star-rating mx-2">{stars}</div>
  );
};

export default StarRating;
