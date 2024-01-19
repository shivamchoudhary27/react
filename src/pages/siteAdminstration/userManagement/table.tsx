import Swal from "sweetalert2";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../store/actions";
import Errordiv from "../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../widgets/skeleton/table";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { searchCountryNameById } from "../../../globals/getCountry";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import { putData, deleteData } from "../../../adapters/coreservices";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";

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
  currentInstitute,
  userPermissions,
}: any) => {
  
  const tableColumn = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/userprofile/${row.original.userId}`}
        >
          {`${row.original.userFirstName.charAt(0).toUpperCase()}${row.original.userFirstName.slice(1)}
           ${row.original.userLastName.charAt(0).toUpperCase()}${row.original.userLastName.slice(1)}`}
        </Link>
      )
    },
    
    {
      Header: "Email",
      accessor: "userEmail",
    },
    {
      Header: "Country",
      Cell: ({ row }: any) => searchCountryNameById(row.original.userCountry),
    },
    {
      Header: "Roles",
      accessor: "",
      Cell: ({ row }: any) =>
        row.original.roles.map((role: any) => role.name).join(", "),
    },
    {
      Header: "Assign Roles",
      Cell: ({ row }: any) => (
        <>
          {userPermissions.role.canAssignRole ? (
            <Link
              className="action-icons"
              to={`/assignroles/${row.original.userId}`}
            >
              Assign Roles
            </Link>
          ) : (
            "Not Allowed"
          )}
        </>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {userPermissions.user.canEdit && (
            <Link className="action-icons" to={""}>
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.userId,
                    userFirstName: row.original.userFirstName,
                    userLastName: row.original.userLastName,
                    userEmail: row.original.userEmail,
                    userCountry: row.original.userCountry,
                    enabled: row.original.enabled,
                  })
                }
              />
            </Link>
          )}

          {userPermissions.user.canDelete && (
            <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.userId)}
              />
            </Link>
          )}

          {userPermissions.user.canEdit && (
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleUserEnabled(row.original);
              }}
            >
              <img
                src={row.original.enabled !== false ? showIcon : hideIcon}
                alt="Show"
              />
            </Link>
          )}
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
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
  const [forceRender, setForceRender] = useState(false);

  const toggleUserEnabled = (userPacket: any) => {
    userPacket.enabled = !userPacket.enabled;
    setForceRender((prevState) => !prevState);
    let endPoint = `/${currentInstitute}/users/${userPacket.userId}`;
    putData(endPoint, userPacket)
      .then((res: any) => {
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        dispatch({
          type: ACTIONSLIST.mitGlobalAlert,
          alertMsg: "Action failed due to some error",
          status: true,
        });
        userPacket.enabled = !userPacket.enabled;
        setForceRender((prevState) => !prevState);
      });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      refreshdata(false);
      let endPoint = `/${currentInstitute}/users/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            refreshdata(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "User has been successfully deleted"
            });
            // setShowAlert(true);
            // setAlertMsg({
            //   message: "Removed successfully!",
            //   alertBoxColor: "success",
            // });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to remove, some error occured",
              alertBoxColor: "danger",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message:
                "This entity is being referenced with another entity. Please first remove reference entity and try again.",
              alertBoxColor: "danger",
            });
          } else if (result.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to remove, some error occured",
              alertBoxColor: "danger",
            });
            refreshdata(true);
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

  // edit event handler === >>>
  const editHandler = ({
    id,
    userFirstName,
    userLastName,
    userEmail,
    userCountry,
    enabled,
  }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      userFirstName,
      userLastName,
      userEmail,
      userCountry,
      enabled,
    });
    // refreshDepartmentData();
  };

  return (
    <React.Fragment>
      <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
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
        modalHeading="User"
      />
    </React.Fragment>
  );
};

export default UserManagementTable;
