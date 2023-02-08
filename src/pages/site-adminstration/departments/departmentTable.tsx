import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
  {
    id: 1,
    department: "Computer Department",
    icon: "fa-solid fa-cubes",
    program: 4,
    manage_Program: "fa-solid fa-gear",
    actions: {
      edit: "fa-solid fa-pen",
      delete: "fa-solid fa-trash",
      show: "fa-solid fa-eye",
    },
  },
  {
    id: 2,
    department: "Electronics Department",
    icon: "fa-solid fa-cubes",
    program: 5,
    manage_Program: "fa-solid fa-gear",
    actions: {
      edit: "fa-solid fa-pen",
      delete: "fa-solid fa-trash",
      show: "fa-solid fa-eye",
    },
  },
  {
    id: 3,
    department: "Dummy Title",
    icon: "fa-solid fa-cubes",
    program: 6,
    manage_Program: "fa-solid fa-gear",
    actions: {
      edit: "fa-solid fa-pen",
      delete: "fa-solid fa-trash",
      show: "fa-solid fa-eye",
    },
  },
];

function DepartmentTable() {

  return (
    <>
      <div className="table-wrapper mt-5">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Department</th>
              <th>No of Programs</th>
              <th>Manage Programs</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any, index: number) => (
              <tr>
                <td>
                  <i className={item.icon}></i> {item.department}
                </td>
                <td>{item.program}</td>
                <td>
                  <i className={item.manage_Program}></i>
                </td>
                <td>
                  <span>
                    <i className={item.actions.edit}></i>
                  </span>{" "}
                  <span>
                    <i className={item.actions.delete}></i>
                  </span>{" "}
                  <span>
                    <i className={item.actions.show}></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default DepartmentTable;
