import React, { useMemo, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import { deleteData } from "../../../adapters/microservices";
import Errordiv from "../../../widgets/alert/errordiv";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import gearIcon from "../../../assets/images/icons/setting-action.svg";

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
          <Link className="action-icons" to="">
            <img src={gearIcon} alt="Setting" onClick={() =>
                configEditHandler({
                  id: row.original.id,
                  name: row.original.name,
                  userEmail: row.original.userEmail,
                  shortCode: row.original.shortCode,
                  instanceUrl: row.original.instanceUrl,
                  webServiceToken: row.original.webServiceToken,
                  locked: row.original.locked,
                })
              } />
          </Link>
          <Link className="action-icons" to={""}>
            <img src={editIcon} alt="Edit" onClick={() =>
                editHandler({
                  id: row.original.id,
                  name: row.original.name,
                  userEmail: row.original.userEmail,
                  shortCode: row.original.shortCode,
                  instanceUrl: row.original.instanceUrl,
                  webServiceToken: row.original.webServiceToken,
                  locked: row.original.locked,
                })
              } />
          </Link>
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" onClick={() => deleteHandler(row.original.id)} />
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
    const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

  useEffect(()=>{
    if (onDeleteAction === "Yes") {
      refreshdata(false);
      let endPoint = `/institutes/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            refreshdata(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully!",
              alertBoxColor: "success",
            });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete, some error occured",
              alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.data.message,
              alertBoxColor: "success",
            });
          } else if (result.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.data.message,
              alertBoxColor: "success",
            });
          }
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction])

  const deleteHandler = (userid: number) => {
    refreshdata(false);
    setShowDeleteModal(true);
    setDeleteId(userid);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    console.log(action);
    setOnDeleteAction(action);
    setShowDeleteModal(false);
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
      <div className="table-responsive table-wrapper mt-3">
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
        {apiStatus === "started" && userdata.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && userdata.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Institute"
      />
      <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </React.Fragment>
  );
};

export default UserManagementTable;
