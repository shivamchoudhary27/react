import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteData } from "../../../adapters/microservices";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const UsersTable = ({
  enrolleduserdata,
  programid,
  refreshdata,
  programname,
  editHandlerById,
  AddUsersModalShow,
  apiStatus
}: any) => {
  const tableColumn = [
    {
      Header: "Full Name",
      Cell: ({ row }: any) =>
        `${row.original.userFirstName} ${row.original.userLastName}`,
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
      Cell: ({ row }: any) => userRoleString(row.original.role),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link
            to=""
            // to={createEditLink(row.original.userId)}
          >
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler(
                  row.original.userId,
                  row.original.userEmail,
                  row.original.roleNumber,
                  row.original.role
                )
              }
            ></i>
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
    return `/enrolusertoprogram/${programid}/${id}/${programname}`;
  };

  const userRoleString = (userRole: string) => {
    if (userRole === "manager") return "Manager";
    if (userRole === "student") return "Student";
    if (userRole === "editingteacher") return "Teacher";
    if (userRole === "teacher") return "Non-editing teacher";
    return "";
  };

  const editHandler = (id: number, email: string, roleNo: string, role: string) => {
    AddUsersModalShow(true)
    editHandlerById(id, email, roleNo, role);
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
        <Table borderless striped hover {...getTableProps()}>
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
        {apiStatus === "started" && enrolleduserdata.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && enrolleduserdata.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default UsersTable;
