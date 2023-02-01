import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { CategoryRawData } from "./rawData";

const tableColumn = [
  {
    Header: "Categories",
    accessor: "categories",
  },
  {
    Header: "Add Sub category",
    accessor: "subCategory",
    Cell: ({ row }: any) => (
      <Link to="">
        <i className={row.values.subCategory}></i>
      </Link>
    ),
  },
  {
    Header: "Courses",
    accessor: "courses",
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

const CategoryTable = () => {
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => CategoryRawData, []);
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

export default CategoryTable;
