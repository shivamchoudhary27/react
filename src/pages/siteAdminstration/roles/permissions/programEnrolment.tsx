import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

const ProgramEnrolment = () => {
  const userdata = [
    { name: "Create User" },
    { name: "Update User" },
    { name: "Delete User" },
    { name: "View User" },
  ];
  const tableColumn = [
    {
      Header: "Program Enrolment",
      accessor: "name",
    },
    {
      Header: (
        <div>
          <input type="checkbox" className="form-check-input" /> Check All
        </div>
      ),
      accessor: "checkbox",
      Cell: ({ row }: any) => {
        return (
          <div>
            <input type="checkbox" className="form-check-input" /> Allow
          </div>
        );
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => userdata, [userdata]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
        <Table borderless striped {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()} key={index}>
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
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};
export default ProgramEnrolment;
