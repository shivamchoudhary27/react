import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { ProgramEnrollRawData } from "./rawData";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";

const tableColumn = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Batch Year",
    accessor: "batchYear",
  },
  {
    Header: "Program Code",
    accessor: "programCode",
  },
  {
    Header: "Manage Users",
    accessor: "manage_users",
    Cell: ({ row }: any) => (
      <Link to={`/manageprogramenrollment/${row.original.id}/${row.original.name}`}>
        <i className="fa fa-users"></i>
      </Link>
    ),
  },
];

const ProgramEnrollTable = ({ enrollmentData }: any) => {
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => enrollmentData, [enrollmentData]);
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
          <tbody {...getTableBodyProps()}>
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
        {enrollmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
      </div>
    </>
  );
};

export default ProgramEnrollTable;
