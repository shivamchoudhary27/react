import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import { deleteData } from "../../../adapters/microservices";
import Errordiv from "../../../widgets/alert/errordiv";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const UserManagementTable = ({
  userdata,
  refreshdata,
  toggleModalShow,
  editHandlerById,
  apiStatus,
  configModalShow,
  editConfigHandler,
}: any) => {
  // console.log(apiStatus);
  const tableColumn = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "userEmail",
    },
    {
      Header: "Short Code",
      accessor: "shortCode",
    },
    {
      Header: "Instance Url",
      accessor: "instanceUrl",
    },
    {
      Header: "Token",
      accessor: "webServiceToken",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i className="fa-solid fa-gear"
              onClick={() =>
                configEditHandler({
                  id: row.original.id,
                  name: row.original.name,
                  userEmail: row.original.userEmail,
                  shortCode: row.original.shortCode,
                  instanceUrl: row.original.instanceUrl,
                  webServiceToken: row.original.webServiceToken,
                  locked: row.original.locked,
                })
              }
            ></i>
          </Link>
          <Link to={""}>
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler({
                  id: row.original.id,
                  name: row.original.name,
                  userEmail: row.original.userEmail,
                  shortCode: row.original.shortCode,
                  instanceUrl: row.original.instanceUrl,
                  webServiceToken: row.original.webServiceToken,
                  locked: row.original.locked,
                })
              }
            ></i>
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
    if (window.confirm("Are you sure to delete this institute?")) {
      refreshdata(false);
      let endPoint = `/institutes/${userid}`;
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

  const configEditHandler = ({
    id,
    name,
    userEmail,
    shortCode,
    instanceUrl,
    webServiceToken,
    locked,
  }: any) => {
    configModalShow(true);
    editConfigHandler({
      id,
      name,
      userEmail,
      shortCode,
      instanceUrl,
      webServiceToken,
      locked,
    });
  };

  // edit event handler === >>>
  const editHandler = ({
    id,
    name,
    userEmail,
    shortCode,
    instanceUrl,
    webServiceToken,
    locked,
  }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      name,
      userEmail,
      shortCode,
      instanceUrl,
      webServiceToken,
      locked,
    });
    // refreshDepartmentData();
  };

  return (
    <React.Fragment>
      <div className="table-wrapper mt-3">
        <Table borderless striped hover {...getTableProps}>
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
        {apiStatus === "started" && userdata.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && userdata.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default UserManagementTable;
