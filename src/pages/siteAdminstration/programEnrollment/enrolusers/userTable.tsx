import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usersRawData } from "./data";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const UserTable = () => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Firstname/Surname",
      accessor: "firstname",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email address",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Groups",
      accessor: "groups",
    },
    {
      Header: "Last access to course",
      accessor: "access",
    },

    {
      Header: "Status",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Button variant="success" size="sm" disabled>
            Active
          </Button>
          <Link to="">
            <i className="fa-solid fa-circle-info"></i>
          </Link>
          <Link to="">
            <i className="fa-solid fa-gear"></i>
          </Link>
          <Link to="">
            <i className="fa-solid fa-trash"></i>
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => usersRawData, [usersRawData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      <div className="table-wrapper mt-5">
        <Table borderless striped hover {...getTableProps}>
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
        {/* {departmentData.length === 0 && <TableSkeleton numberOfRows={5} numberOfColumns={4} />} */}
      </div>
    </React.Fragment>
  );
};

export default UserTable;
