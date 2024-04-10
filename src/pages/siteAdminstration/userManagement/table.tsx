import Swal from "sweetalert2";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
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
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";

const UserManagementTable = ({
  userdata,
  refreshdata,
  toggleModalShow,
  editHandlerById,
  apiStatus,
  currentInstitute,
  userPermissions,
  setFilterUpdate,
  filterUpdate,
}: any) => {
  const authenticatedUserPermission = useSelector(
    (state: any) => state.authenticatedUser.permissions.menu
  );

  const { handleTableSorting } = useTableSorting();

  const tableColumn = [
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("userFirstName", setFilterUpdate)}
          >
           <span> First Name </span>
          <span>
            {filterUpdate.sortBy === "userFirstName" &&
            filterUpdate.sortOrder === "asc" ? (
              <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by First Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                    </button>
                </OverlayTrigger>
              ) : filterUpdate.sortBy === "userFirstName" &&
              filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by First Name Descending </BsTooltip>}
                ><button className="btn btn-link text-white p-0">
                <TbSortDescending />
                </button>
                </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by First Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                  <PiArrowsDownUpBold />
                  </button>
                </OverlayTrigger>
                  )}
          </span>
                  </span>
        </div>
      ),
      accessor: "userFirstName",
      Cell: ({ row }: any) => (
        <>
          {`${row.original.userFirstName.charAt(0).toUpperCase()}${row.original.userFirstName.slice(1)} `}
        </>
      ),
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("userLastName", setFilterUpdate)}
          >
            <span> Last Name </span>
          <span>
            {filterUpdate.sortBy === "userLastName" &&
            filterUpdate.sortOrder === "asc" ? (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Sorted by Last Name Ascending</BsTooltip>}
            >
              <button className="btn btn-link text-white p-0">
              <TbSortAscending />
              </button>
              </OverlayTrigger>
              ) : filterUpdate.sortBy === "userLastName" &&
              filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Last Name Descending</BsTooltip>}
              >
                <button className="btn btn-link text-white p-0">
                <TbSortDescending />
                </button>
               </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Last Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                  <PiArrowsDownUpBold />
                  </button>
                  </OverlayTrigger>
                  )}
          </span>
                  </span>
        </div>
      ),
      accessor: "userLastName",
      Cell: ({ row }: any) => (
        <>
          {`${row.original.userLastName.charAt(0).toUpperCase()}${row.original.userLastName.slice(1)}`}
        </>
      ),
    },
    {
      Header: (
        <div>
          <span
            onClick={() => handleTableSorting("userEmail", setFilterUpdate)}
          >
            Email
          <span>
          {filterUpdate.sortBy === "userEmail" &&
            filterUpdate.sortOrder === "asc" ? (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Sorted by Email Ascending </BsTooltip>}
            >
              <button className="btn btn-link text-white p-0">
              <TbSortAscending />
              </button>
              </OverlayTrigger>
              ) : filterUpdate.sortBy === "userEmail" &&
              filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Email Descending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0">
                <TbSortDescending />
                </button>
               </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Email Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                  <PiArrowsDownUpBold />
                  </button>
                  </OverlayTrigger>
                  )}
          </span>
                  </span>
        </div>
      ),
      accessor: "userEmail",
      Cell: ({ row }: any) => (
        <OverlayTrigger
        placement="top"
        overlay={<BsTooltip>View Profile</BsTooltip>}
        trigger="hover"
       >
        <Link
          className="action-icons"
          to={
            authenticatedUserPermission.profile.canView
              ? `/userprofile/${row.original.userId}`
              : "#"
          }
        >
          {row.original.userEmail}
        </Link>
        </OverlayTrigger>
      ),
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
        <span className="d-flex justify-content-around align-items-center">
          {userPermissions.user.canEdit && (
            <OverlayTrigger
            placement="top"
            overlay={<BsTooltip>Update User Details</BsTooltip>}
            trigger="hover"
           >
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
                </OverlayTrigger>
          )}

          {userPermissions.user.canDelete && (
          <OverlayTrigger
          placement="top"
          overlay={<BsTooltip>Delete User</BsTooltip>}
          trigger="hover"
         >
         <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.userId)}
                />
            </Link>
                </OverlayTrigger>
          )}

          {userPermissions.user.canEdit && (
             <OverlayTrigger
             placement="top"
             overlay={<BsTooltip>Hide/Unhide User</BsTooltip>}
             trigger="hover"
            >
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
            </OverlayTrigger>
          )}
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, [filterUpdate]);
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
              text: "User has been successfully deleted from the institute.",
            });
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
