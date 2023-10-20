import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";
import Errordiv from "../../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import { searchCountryNameById } from "../../../../globals/getCountry";
import { putData, deleteData } from "../../../../adapters/coreservices";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const GuestUsersTable = ({
  apiStatus,
  refreshdata,
  guestUsersData,
  editHandlerById,
  toggleModalShow,
}: any) => {
  const tableColumn = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }: any) =>
        `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Country",
      Cell: ({ row }: any) => searchCountryNameById(row.original.country),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {/* {userPermissions.user.canEdit && ( */}
            <Link className="action-icons" to={""}>
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    userFirstName: row.original.firstName,
                    userLastName: row.original.lastName,
                    userEmail: row.original.email,
                    userCountry: row.original.country,
                    enabled: row.original.enabled,
                  })
                }
              />
            </Link>
          {/* )} */}

          {/* {userPermissions.user.canDelete && ( */}
            <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.id)}
              />
            </Link>
          {/* )} */}

          {/* {userPermissions.user.canEdit && ( */}
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
          {/* )} */}
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => guestUsersData, [guestUsersData]);
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
    let endPoint = `/users/all_users/${userPacket.userId}`;
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
      let endPoint = `/users/all_users/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          // console.log("delet data------",res)
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
              alertBoxColor: "danger",
            });
          }
        })
        .catch((result: any) => {
          // console.log("delete data------",result)

          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.message,
              alertBoxColor: "danger",
            });
          } else if (result.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete, some error occured",
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
        {apiStatus === "started" && guestUsersData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && guestUsersData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="User"
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

export default GuestUsersTable;
