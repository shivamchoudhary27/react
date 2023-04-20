import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteData } from "../../../adapters/microservices";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const UsersTable = ({enrolleduserdata, programid, refreshdata}: any) => {

  const tableColumn = [
    {
      Header: "Full Name",
      Cell: ({ row }: any) => (
        `${row.original.userFirstName} ${row.original.userLastName}`
      ),
    },
    {
      Header: "Email",
      accessor: "userEmail",
    },
    {
      Header: "Role No",
      accessor: "roleNumber",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to={createEditLink(row.original.userId)}>
            <i className="fa-solid fa-pen"></i>
          </Link>
          <Link to="">
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteHandler(row.original.userId)}
              ></i>
          </Link>
        </span>
      ),
    },
  ];

  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => enrolleduserdata, [enrolleduserdata]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const createEditLink = (id: number) => {
    return `/enrolusertoprogram/${programid}/${id}`;
  };

  const deleteHandler = (userid: number) => {
    if (window.confirm("Are you sure to delete this user?")) {
      refreshdata(false);
      let endPoint = `/program/${programid}/enrol-user/${userid}`;
      deleteData(endPoint)
        .then((res: any) => {
          console.log(res);
          if (res.status === 200) {
            refreshdata(true);
          } else if (res.status === 500) {
            window.alert("Unable to delete, some error occured");
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            window.alert(result.response.data.message);
          } else if (result.response.status === 500) {
            window.alert(result.response.data.message);
          }
        });
    }
  };
  return (
    <React.Fragment>
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
                    <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default UsersTable;
