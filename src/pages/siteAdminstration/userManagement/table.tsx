import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import { deleteData } from "../../../adapters/coreservices";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const UserManagementTable = ( {userdata, refreshdata} : any) => {
  const tableColumn = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }: any) => (
        `${row.original.firstName} ${row.original.lastName}`
      ),
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to={`/addusersform/${row.original.id}`}>
            <i className="fa-solid fa-pen"></i>
          </Link>
          <Link to="">
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteHandler(row.original.id)}
              ></i>
            </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => userdata, [userdata]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  
  const deleteHandler = (userid: number) => {
    if (window.confirm("Are you sure to delete this user?")) {
      refreshdata(false);
      let endPoint = `/user/${userid}`;
      deleteData(endPoint)
        .then((res: any) => {
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
      <div className="table-wrapper mt-5">
        <Table bordered hover {...getTableProps}>
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
        {userdata.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
      </div>
    </React.Fragment>
  );
};

export default UserManagementTable;
