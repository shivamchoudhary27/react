import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
// import TableSkeleton from "../../../widgets/skeleton/table";
// import Errordiv from "../../../widgets/alert/errordiv";

type Props = {
  apiStatus?: string;
};

const gradeData = [
  {
    firstname: "Rohit Panchal",
    email: "rohit.panchal@gmail.com",
    courseTotal: "40.00",
  },
  {
    firstname: "Ravi",
    email: "ravi@gmail.com",
    courseTotal: "39.00",
  },
  {
    firstname: "Karan",
    email: "karan@gmail.com",
    courseTotal: "54.00",
  },
];

const GradeTable = ({ apiStatus }: Props) => {
  const tableColumn = [
    { Header: "SN.", accessor: (row: any, index: number) => index + 1 },
    {
      Header: "Firstname/Surname",
      accessor: "firstname",
    },
    {
      Header: "Email address",
      accessor: "email",
    },
    {
      Header: "Course Total",
      accessor: "courseTotal",
    },
    {
      Header: "Details",
      Cell: ({ row }: any) => {
        return <Link to="#">View</Link>;
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => gradeData, [gradeData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      <div className="table-responsive table-wrapper mt-3 mygradebook">
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
        {/* {apiStatus === "started" && gradebookObj.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && gradebookObj.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )} */}
      </div>
    </React.Fragment>
  );
};

export default GradeTable;
