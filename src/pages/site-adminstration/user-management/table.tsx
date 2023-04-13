import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";

export const rawData = [
  {
    name: "User1",
    email: "user1@gmail.com",
    city: "Delhi",
  },
  {
    name: "User2",
    email: "user2@gmail.com",
    city: "Mumbai",
  },
  {
    name: "User3",
    email: "user3@gmail.com",
    city: "Bangalore",
  },
];

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const tableColumn = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => (
      <span style={actionsStyle}>
        <Link to="">
          <i className="fa-solid fa-pen"></i>
        </Link>
        <Link to="">
          <i className="fa-solid fa-trash"></i>
        </Link>
      </span>
    ),
  },
];

const UserManagementTable = () => {
  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => rawData, [rawData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <React.Fragment>
      <div className="table-wrapper mt-5">
        <Table bordered hover {...getTableProps}>
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
        {rawData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
      </div>
    </React.Fragment>
  );
};

export default UserManagementTable;
