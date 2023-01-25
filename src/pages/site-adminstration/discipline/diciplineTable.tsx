import React from "react";
import { Table } from "react-bootstrap";
import { rawData } from "./data";


const dynamicTableRow = rawData.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.program}</td>
      <td>
        <span>
          <i className={item.actions.edit}></i>
        </span>{" "}
        <span>
          <i className={item.actions.delete}></i>
        </span>{" "}
        <span>
          <i className={item.actions.hide}></i>
        </span>
      </td>
    </tr>
  ));


const DiciplineTable = () => {
  return (
    <>
      <div className="table-wrapper mt-3">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Program Attached</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dynamicTableRow}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DiciplineTable;
