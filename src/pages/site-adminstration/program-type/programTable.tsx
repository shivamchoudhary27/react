import React from "react";
import { Table } from "react-bootstrap";

const ProgramTable = () => {
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
            <tr>
              <td>Certificate & Diploma</td>
              <td>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </td>
              <td>3</td>
              <td>
                <span>
                  <i className="fa-solid fa-pen"></i>
                </span>{" "}
                <span>
                  <i className="fa-solid fa-trash"></i>
                </span>{" "}
                <span>
                  <i className="fa-solid fa-eye"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>Post Graduate</td>
              <td>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </td>
              <td>6</td>
              <td>
                <span>
                  <i className="fa-solid fa-pen"></i>
                </span>{" "}
                <span>
                  <i className="fa-solid fa-trash"></i>
                </span>{" "}
                <span>
                  <i className="fa-solid fa-eye"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProgramTable;
