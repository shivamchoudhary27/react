import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { ManageRawData } from "./rawData";
import { useTable } from "react-table";

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
  },
  {
    Header: "Manage Courses",
    accessor: "manage_courses",
    Cell: ({ row }: any) => <i className={row.values.manage_courses}></i>,
  },
  {
    Header: "Manage Users",
    accessor: "manage_users",
    Cell: ({ row }: any) => <i className={row.values.manage_users}></i>,
  },
  {
    Header: "Actions",
    accessor: "",
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
