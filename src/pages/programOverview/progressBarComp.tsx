import React from "react";
import { ProgressBar, Button } from "react-bootstrap";

const starRating = (
  <div>
    <i className="fa-solid fa-star"></i>
    <i className="fa-solid fa-star"></i>
    <i className="fa-solid fa-star"></i>
    <i className="fa-solid fa-star"></i>
    <i className="fa-solid fa-star"></i>
  </div>
);

const ProgressBarComp = () => { 
  return (
    <React.Fragment>
      {Data.map((item, index) => (
        <div key={index}>
          <div><ProgressBar variant="success" now={item.progress} className="mb-1" /></div>
          <div>{starRating}</div>
          <div>{item.percentage}</div>
        </div>
      ))}
      <Button className="btn btn-primary btn-sm">Give Rating</Button>
    </React.Fragment>
  );
};

export default ProgressBarComp;

const Data = [
  {
    progress: 80,
    percentage: "80%",
    rating: "",
  },
  {
    progress: 50,
    percentage: "50%",
    rating: "",
  },
  {
    progress: 20,
    percentage: "20%",
    rating: "",
  },
  {
    progress: 5,
    percentage: "5%",
    rating: "",
  },
  {
    progress: 0,
    percentage: "0%",
    rating: "",
  },
];
