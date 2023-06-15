import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { ProgramEnrollRawData } from "./rawData";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import usersIcon from "../../../assets/images/icons/manage-users-action.svg";

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
      <Link className="action-icons" to={`/manageprogramenrollment/${row.original.id}/${row.original.name}`}>
        <img src={usersIcon} alt="Manage Users" />
      </Link>
    ),
  },
];

const ProgramEnrollTable = ({ enrollmentData, apiStatus }: any) => {
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
        <Table borderless striped {...getTableProps()}>
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
        {apiStatus === "started" && enrollmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && enrollmentData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </>
  );
};

export default ProgramEnrollTable;
