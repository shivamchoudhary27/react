import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { ManageRawData } from "./rawData";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const tableColumn = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Batch Year",
    accessor: "year",
  },
  {
    Header: "Program Code",
    accessor: "code",
  },
  {
    Header: "Manage Categories",
    accessor: "categories",
    Cell: ({ row }: any) => (
      <Link to="/managecategory">
        <i className={row.values.categories}></i>
      </Link>
    ),
  },
  {
    Header: "Manage Courses",
    accessor: "manage_courses",
    Cell: ({ row }: any) => (
      <Link to="/managecourses">
        <i className={row.values.manage_courses}></i>
      </Link>
    ),
  },
  {
    Header: "Manage Users",
    accessor: "manage_users",
    Cell: ({ row }: any) => (
      <Link to="/manageusers">
        <i className={row.values.manage_users}></i>
      </Link>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }: any) => (
      <span>
        <Link to="">
          <i className={row.values.actions.edit}></i>
        </Link>{" "}
        <Link to="">
          <i className={row.values.actions.delete}></i>
        </Link>{" "}
        <Link to="">
          <i className={row.values.actions.hide}></i>
        </Link>
      </span>
    ),
  },
];

const ManageTable = () => {
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => ManageRawData, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <>
      <div className="table-wrapper mt-3">
        <Table bordered hover {...getTableProps()}>
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
          <tbody {...getTableBodyProps()}>
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

export default ManageTable;
