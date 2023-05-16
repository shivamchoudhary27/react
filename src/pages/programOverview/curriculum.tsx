import React from "react";
import { Table } from "react-bootstrap";

const Curriculum = () => {
  return (
    <React.Fragment>
        <div className="m-3">
            <h4>Curriculum</h4>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Semister I</th>
            <th>Semister II</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Core Course (CC)</th>
            <th>Core Course (CC)</th>
          </tr>
          <tr>
            <td>Introduction to Media and Communication</td>
            <td>Introduction to Electronic Media</td>
          </tr>
          <tr>
            <td>Contemporary Media</td>
            <td>Political Communication and History</td>
          </tr>
          <tr>
            <td>Translation and Interpretation in media</td>
            <td>News Writing and Reporting</td>
          </tr>
          
          <tr>
            <th>Skill Enhancement Course (SEC)</th>
            <th>Skill Enhancement Course (SEC)</th>
          </tr>
          <tr>
            <td>Visual Communication</td>
            <td>Gender studies and media</td>
          </tr>
          <tr>
            <td>Language skills for media</td>
            <td>Language skills for media</td>
          </tr>

          <tr>
            <th>Ability Enhancement Course(AECC)</th>
            <th>Ability Enhancement Course(AECC)</th>
          </tr>
          <tr>
            <td>Introduction to Psychology</td>
            <td>Introduction to Advertising and Marketing</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default Curriculum;
