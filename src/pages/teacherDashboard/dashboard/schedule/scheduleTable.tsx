import React from "react";
import { Table, Button, Card } from "react-bootstrap";
import "./style.scss";

const ScheduleTable = () => {
  return (
    <>
      <Card body>
        <div className="mb-2">
          <h4>TODAY SCHEDULE</h4>
          <h6>Friday, 17 February 2023</h6>
        </div>
          <Table responsive>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="icon-bg">
                      <i className={item.icon}></i>
                    </div>
                  </td>
                  <td>
                    <div className="schedule-contents">
                      <h6>{item.title}</h6>
                      <p>{item.time}</p>
                      <p>{item.subtitle}</p>
                      <Button size="sm" variant="secondary">
                        {item.btn}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Card>
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
    icon: "fa-solid fa-calendar-days",
  },
  {
    title: "Calculate the length of SVG path",
    subtitle: "Intro to JS: Drawing & Ani mation",
    time: "11 : 15 AM",
    btn: "Online",
    icon: "fa-solid fa-calendar-days",
  },
  {
    title: "Advantages of DBMS",
    subtitle: "Database management system",
    time: "12 : 00 PM",
    btn: "Online",
    icon: "fa-solid fa-calendar-days",
  },
  {
    title: "Structure and Function (Multicore Computer)",
    subtitle: "Computer Organization and Architecture, Venue name",
    time: "01 : 00 AM",
    btn: "Lab",
    icon: "fa-solid fa-calendar-days",
  },
  {
    title: "Hirerarchical database system",
    subtitle: "Database Management System",
    time: "02 : 30 PM",
    btn: "Online",
    icon: "fa-solid fa-calendar-days",
  },
];
