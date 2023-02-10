import React from "react";
import { Table } from "react-bootstrap";

const ProgramTable = ({ programTypeData }: any) => {
  const editHandler = (id: number) => {
    console.log(id);
  };

  const deleteHandler = (id: number) => {
    console.log(id);
  };

  const showToggleHandler = (id: number) => {
    console.log(id);
  };

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
            {programTypeData.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>3</td>
                <td>
                  <span>
                    <i
                      className="fa-solid fa-pen"
                      onClick={() => editHandler(item.id)}
                    ></i>
                  </span>{" "}
                  <span>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteHandler(item.id)}
                    ></i>
                  </span>{" "}
                  <span>
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => showToggleHandler(item.id)}
                    ></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProgramTable;
