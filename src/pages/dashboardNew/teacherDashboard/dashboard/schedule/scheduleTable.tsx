import "./style.scss";
import { Table, Button, Card } from "react-bootstrap";
import calendarIcon from "../../../../../assets/images/icons/calendar-black.svg";

const ScheduleTable = () => {
  return (
    <>
      <div className="mitblock-body">
          {tableData.map((item, index) => (
            <div className="d-flex align-items-center tsb-row mb-3" key={index}>
              <div className="align-self-start me-3">
                <img src={calendarIcon} alt="Schedule Icon" />
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
    title: "Computer organization and Architecture",
    subtitle: "Organization and Architecture",
    time: "10 : 30 AM",
    btn: "Offline",
    classname: "offline"
  },
  {
    title: "Calculate the length of SVG path",
    subtitle: "Intro to JS: Drawing & Ani mation",
    time: "11 : 15 AM",
    btn: "Online",
    classname: "online",
  },
  {
    title: "Advantages of DBMS",
    subtitle: "Database management system",
    time: "12 : 00 PM",
    btn: "Lab",
    classname: "lab",
  },
  {
    title: "Structure and Function (Multicore Computer)",
    subtitle: "Computer Organization and Architecture, Venue name",
    time: "01 : 00 AM",
    btn: "Offline",
    classname: "offline",
  },
  {
    title: "Hirerarchical database system",
    subtitle: "Database Management System",
    time: "02 : 30 PM",
    btn: "Online",
    classname: "online",
  },
];
