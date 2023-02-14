import React, { useMemo } from "react";
import { usersRawData } from "./data";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableColumn = [
  {
    Header: "Full Name",
    accessor: "fullname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role No",
    accessor: "roleNo",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }: any) => (
      <span>
        <Link to=""><i className={row.values.actions.edit} onClick={()=>editHandler(row.id)}></i></Link>{" "}
        <Link to=""><i className={row.values.actions.delete} onClick={()=>deleteHandler(row.id)}></i></Link>{" "}
        <Link to=""><i className={row.values.actions.hide} onClick={()=>showToggleHandler(row.id)}></i></Link>
      </span>
    ),
  },
];

const editHandler = (id: number) => {
  console.log(id)
}
const deleteHandler = (id: number) => {
  console.log(id)
}
const showToggleHandler = (id: number) => {
  console.log(id)
}

const UsersTable = () => {
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => usersRawData, [usersRawData]);
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
              console.log(row)
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

export default UsersTable;
