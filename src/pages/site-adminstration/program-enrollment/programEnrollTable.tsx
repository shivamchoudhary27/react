import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { ProgramEnrollRawData } from './rawData';
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
    Header: "Manage Users",
    accessor: "manage_users",
    Cell: ({ row }: any) => <Link to="/manageusers"><i className={row.values.manage_users}></i></Link>,
  },
];

const ProgramEnrollTable = () => {
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => ProgramEnrollRawData, []);
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

export default ProgramEnrollTable;