import React, { useMemo, useState, useEffect } from "react";
import { Button, OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
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
import "sweetalert2/src/sweetalert2.scss";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdHelpOutline } from "react-icons/md";
import { isMobile } from 'react-device-detect';

const triggerType = isMobile ? 'focus' : ['hover', 'focus'];

type UserManagementTableProps = {
  userdata: any[];
  refreshdata: (params: boolean) => void;
  toggleModalShow: (params: boolean) => void;
  editHandlerById: any;
  apiStatus: string;
  configModalShow: (params: boolean) => void;
  editConfigHandler: any;
};

const UserManagementTable: React.FunctionComponent<
  UserManagementTableProps
> = ({
  userdata,
  refreshdata,
  toggleModalShow,
  editHandlerById,
  apiStatus,
  configModalShow,
  editConfigHandler,
  permissions,
}: UserManagementTableProps) => {
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
      Header: "Status",
      accessor: "",
      Cell: ({ row }: any) => {
        return row.original.locked !== true ? (
          <div style={{color: "#ff8c00" }}>
            Pending
          </div>
        ) : (
          // <div style={{color: "green"}}><FaCheck /></div>
          <div style={{color: "green"}}>Active</div>
        );
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span className="d-flex justify-content-evenly align-items-center">
          {permissions.canEdit && (
            <>
              <Link className="action-icons" to="">
                <img
                  src={gearIcon}
                  alt="Setting"
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
                />
              </Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip id="button-tooltip-2">Set Institute Configuration with Instance URL and Web Service Token</BsTooltip>}
                >
                  <Button variant="link">
                    <MdHelpOutline fontSize={30} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
               placement="top"
               overlay={<BsTooltip>Update Institute Details</BsTooltip>}
               trigger={triggerType}
              >
              <Link className="action-icons" to={""}>
                <img
                  src={editIcon}
                  alt="Edit"
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
                  />
              </Link>
                  </OverlayTrigger>
            </>
          )}
          {permissions.canDelete && (
               <OverlayTrigger
               placement="top"
               overlay={<BsTooltip>Delete Institute</BsTooltip>}
               trigger={triggerType}
              >
            <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.id)}
                />
            </Link>
                </OverlayTrigger>
          )}
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

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      refreshdata(false);
      let endPoint = `/institutes/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            refreshdata(true);
            setShowAlert(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Institute has been successfully deleted",
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
  }, [onDeleteAction]);

  const deleteHandler = (userid: number) => {
    refreshdata(false);
    setShowDeleteModal(true);
    setDeleteId(userid);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
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
      <div className="table-responsive admin-table-wrapper mt-3">
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
