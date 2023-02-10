import React, { useState, useMemo } from "react";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Computer Department",
    program: 2,

  },
  {
    name: "Science Department",
    program: 3,

  },
  {
    name: "Physics Department",
    program: 5,

  },
];

// const tableColumn = [
//   {
//     Header: "Department",
//     accessor: "name",
//   },
//   {
//     Header: "No of Programs",
//     accessor: "",
//   },
//   {
//     Header: "Manage Programs",
//     accessor: "",
//   },
//   {
//     Header: "Actions",
//     Cell: ({ row }: any) => (
//       <span>
//         <Link to="">
//           <i
//             className="fa-solid fa-pen"
//             onClick={() => editHandler(row.id)}
//           ></i>
//         </Link>{" "}
//         <Link to="">
//           <i
//             className="fa-solid fa-trash"
//             onClick={() => deleteHandler(row.id)}
//           ></i>
//         </Link>{" "}
//         <Link to="">
//           <i
//             className="fa-solid fa-eye"
//             onClick={() => showToggleHandler(row.id)}
//           ></i>
//         </Link>
//       </span>
//     ),
//   },
// ];

const DepartmentTable = ({ departmentData }: any) => {
  // const columns = useMemo(() => tableColumn, []);
  // const data = useMemo(() => departmentData, [departmentData]);
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({
  //     columns,
  //     data,
  //   });

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
      <div className="table-wrapper mt-5">
        <Table bordered hover>
          <thead>
            {/* {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))} */}
            <tr>
              <th>Department</th>
              <th>No of Programs</th>
              <th>Manage Programs</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })} */}

            {data.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <i className="fa-solid fa-cubes"></i> {item.name}
                </td>
                <td>{2}</td>
                <td>
                  <Link to="/manageprogram">
                    <i className="fa-solid fa-gear"></i>
                  </Link>
                </td>
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

export default DepartmentTable;
