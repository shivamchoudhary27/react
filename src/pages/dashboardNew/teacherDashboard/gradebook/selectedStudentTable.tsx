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
    gradeItem: "Introduction to Logic and Proof",
    calculatedWeight: "100.00%",
    grade:"1.33",
    range:"0-10",
    percentage:"13.33%",
    feedback:"-",
    contributionToCourseTotal:"13.13%"
  },
  {
    gradeItem: "Logic connective",
    calculatedWeight: "0.00(Empty)",
    grade:"-",
    range:"0-10",
    percentage:"-",
    feedback:"-",
    contributionToCourseTotal:"0.00%"
  },
  {
    gradeItem: "Direct Proof",
    calculatedWeight: "0.00(Empty)",
    grade:"-",
    range:"0-20",
    percentage:"-",
    feedback:"-",
    contributionToCourseTotal:"0.00%"
  },
];

const SelectedStudentTable = ({ apiStatus }: Props) => {
  const tableColumn = [
    {
      Header: "Grade Item",
      accessor: "gradeItem",
    },
    {
      Header: "Calculated weight",
      accessor: "calculatedWeight",
    },
    {
      Header: "Grade",
      accessor: "grade",
    },
    {
      Header: "Range",
      accessor: "range",
    },
    {
      Header: "Percentage",
      accessor: "percentage",
    },
    {
      Header: "Feedback",
      accessor: "feedback",
    },
    {
      Header: "Contribution to course total",
      accessor: "contributionToCourseTotal",
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

export default SelectedStudentTable;
