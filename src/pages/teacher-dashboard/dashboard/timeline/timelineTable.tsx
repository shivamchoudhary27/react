import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";

const TimelineTable = () => {
  return (
    <>
      <h6>Mon Feb 11 2023</h6>
      <Container>
        <Table responsive>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>icon</td>
                <td>
                  <div className="table-contents-wrapper">
                    <div>
                      <h6>{item.title}</h6>
                      <p>{item.subtitle}</p>
                      <Link to="">{item.link}</Link>
                    </div>
                    <div>{item.time}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
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
