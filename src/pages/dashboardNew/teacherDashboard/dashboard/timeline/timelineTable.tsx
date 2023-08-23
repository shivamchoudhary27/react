import React from "react";
import { Container, Table } from "react-bootstrap";
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
    title: "Data Structures Evolution",
    subtitle: "The evolution of data structures",
    link: "view submissions",
    time: "14 : 30",
  },
  {
    title: "Quiz on hirearchical database systems",
    subtitle: "Database management system",
    link: "view Grades",
    time: "11 : 15",
  },
];
