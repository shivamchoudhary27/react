import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";

const TimelineTable = () => {
  return (
    <>
      <div className="mitblock-body">
          {tableData.map((item, index) => (
            <div className="d-flex align-items-center atb-row" key={index}>
              <div className="atb-info">
                <h6>{item.title}</h6>                
                <p>{item.subtitle}</p>
                <span>{item.time}</span>
              </div>
              <a href="#" className="btn btn-light btn-sm atb-button">{item.link}</a>
            </div>
          ))}          
      </div>
    </>
  );
};

export default TimelineTable;

const tableData = [
  {
    title: "The Natural Number System",
    subtitle: "Discrete Mathmatical Structures",
    link: "Add submission",
    time: "14 : 30",
  },
  {
    title: "Arrays",
    subtitle: "Data structure & Algorithms",
    link: "Attempt Quiz",
    time: "11 : 15",
  },
];
