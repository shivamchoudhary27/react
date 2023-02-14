import React, { useState, useMemo } from "react";
import { deleteData as deleteDepartmentData } from "../../../adapters/microservices";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const DepartmentTable = ({
  departmentData,
  editHandlerById,
  toggleModalShow,
  refreshDepartmentData,
}: any) => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Department",
      accessor: "name",
    },
    {
      Header: "No of Programs",
      Cell: () => {
        <span>{2}</span>;
      },
    },
    {
      Header: "Manage Programs",
      Cell: ({ row }: any) => {
        <Link to="">
          <i
            className="fa-solid fa-pen"
            onClick={() =>
              console.log(`Navigate to setting page. Id - ${row.id}`)
            }
          ></i>
        </Link>;
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler({ id: row.original.id, name: row.original.name })
              }
            ></i>
          </Link>
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(row.original.id)}
            ></i>
          </Link>
          <Link to="">
            <i
              className="fa-solid fa-eye"
              onClick={() => showToggleHandler(row.original.id)}
            ></i>
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => departmentData, [departmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ id, name }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name });
    refreshDepartmentData(false);
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    const confirmBox = confirm("You want to delete");
    if (confirmBox === true) {
      let endPoint = `/departments/${id}`;
      refreshDepartmentData(false);
      deleteDepartmentData(endPoint).then((res) => {
        if (res.data !== "" && res.status === 200) {
          refreshDepartmentData(true);
        }
      });
    }
  };

  // hide show toggle event handler === >>>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <div className="table-wrapper mt-5">
        <Table bordered hover {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DepartmentTable;
