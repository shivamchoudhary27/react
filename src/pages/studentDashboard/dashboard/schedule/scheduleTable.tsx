import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./style.scss";
import degreeIcon from "../../../../assets/images/icons/degree.svg";

const ScheduleTable = () => {
  return (
    <>
      <div className="mitblock-body">
          {tableData.map((item, index) => (
            <div className="d-flex align-items-center tsb-row mb-2" key={index}>
              <div className="align-self-start me-3">
                <img src={degreeIcon} alt="Schedule Icon" />
              </div>
              <div className="tsb-info">
                <h6>{item.title}</h6>                
                <p>{item.subtitle}</p>
                <span>{item.time}</span>
              </div>
              <span className={`badge tsb-button ${item.classname}`}>{item.btn}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default ScheduleTable;

const tableData = [
  {
    title: "Introduction to logic and Proofs",
    subtitle: "Discrete Mathmatical Structures, Venue name",
    time: "10:30 AM",
    btn: "Offline",
    classname: "offline"
  },
  {
    title: "Data structure Evolution",
    subtitle: "Data structure & Algorithms",
    time: "11:15 AM",
    btn: "Online",
    classname: "online"
  },
  {
    title: "Advantages of DBMS",
    subtitle: "Database management system",
    time: "12:00 PM",
    btn: "Online",
    classname: "lab"
  },
  {
    title: "Structure and Function (Multicore Computer)",
    subtitle: "Computer Organization and Architecture, Venue name",
    time: "01:00 AM",
    btn: "Lab",
    classname: "online"
  },
  {
    title: "CISC v/s RISC",
    subtitle: "Computer Organization and Architecture",
    time: "02:30 PM",
    btn: "Online",
    classname: "online"
  },
];
