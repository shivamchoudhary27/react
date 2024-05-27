import Swal from "sweetalert2";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "sweetalert2/src/sweetalert2.scss";
import ACTIONSLIST from "../../../../store/actions";
import Errordiv from "../../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import { searchCountryNameById } from "../../../../globals/getCountry";
import {  deleteData } from "../../../../adapters/coreservices";
import { MdPersonRemove } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { OverlayTrigger, Table, Tooltip as BsTooltip,Tooltip } from "react-bootstrap";     
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";


// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const GuestUsersTable = ({
  apiStatus,
  refreshdata,
  guestUsersData,
  editHandlerById,
  toggleModalShow,
  setFilterUpdate,
  filterUpdate,
}: any) => {

  const { handleTableSorting } = useTableSorting();

  const tableColumn = [
    {
      Header:(  
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
                <button className="btn btn-link text-white p-0"	 >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "userFirstName" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by First Name Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by First Name Ascending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0" >
                <PiArrowsDownUpBold />
                </button>
              </OverlayTrigger>
                )}
        </span>
                </span>
      </div>
    ),
      accessor: "userFirstName",
      Cell: ({ row }: any) =>
        `${row.original.firstName
          .charAt(0)
          .toUpperCase()}${row.original.firstName.slice(1)}`
        
    },

    {
      Header:(  
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
                overlay={<BsTooltip>Sorted by Last Name Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0"	 >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "userLastName" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Last Name Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Last Name Ascending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0" >
                <PiArrowsDownUpBold />
                </button>
              </OverlayTrigger>
                )}
        </span>
                </span>
      </div>
    ),
      accessor: "userLastName",
      Cell: ({ row }: any) =>
     `${row.original.lastName
        .charAt(0)
        .toUpperCase()}${row.original.lastName.slice(1)}`,
        
    },

    
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("email", setFilterUpdate)}
        >
         <span> Email </span>
        <span>
          {filterUpdate.sortBy === "email" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Email Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0"	 >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "email" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Email Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Email Ascending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0" >
                <PiArrowsDownUpBold />
                </button>
              </OverlayTrigger>
                )}
        </span>
                </span>
      </div>
    ),
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
          <Link
            className="action-icons"
            to={""}
            onClick={() =>
              editHandler({
                id: row.original.id,
                firstName: row.original.firstName,
                lastName: row.original.lastName,
                email: row.original.email,
                country: row.original.country,
                instituteIds: row.original.instituteIds,
              })
            }
          >
            {/* <img
              src={editIcon}
              alt="Edit"
              onClick={() =>
                editHandler({
                  id: row.original.id,
                  firstName: row.original.firstName,
                  lastName: row.original.lastName,
                  email: row.original.email,
                  country: row.original.country,
                  instituteIds: row.original.instituteIds,
                })
              }
            /> */}
            <FaCheckCircle size={15} /> Confirm User
          </Link>
          {/* )} */}

          {/* {userPermissions.user.canDelete && ( */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="button-tooltip-2">Remove User</Tooltip>}
          >
            <Link
              className="action-icons"
              to=""
              onClick={() => deleteHandler(row.original.id)}
            >
              <MdPersonRemove size={20} />
            </Link>
          </OverlayTrigger>
          {/* )} */}

          {/* {userPermissions.user.canEdit && ( */}
          {/* <Link
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
          </Link> */}
          {/* )} */}
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, [filterUpdate]);
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
  // const [forceRender, setForceRender] = useState(false);

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  // const toggleUserEnabled = (userPacket: any) => {
  //   userPacket.enabled = !userPacket.enabled;
  //   setForceRender((prevState) => !prevState);
  //   let endPoint = `/users/all_users/${userPacket.userId}`;
  //   putData(endPoint, userPacket)
  //     .then((res: any) => {
  //       setForceRender((prevState) => !prevState);
  //     })
  //     .catch((err: any) => {
  //       dispatch({
  //         type: ACTIONSLIST.mitGlobalAlert,
  //         alertMsg: "Action failed due to some error",
  //         status: true,
  //       });
  //       userPacket.enabled = !userPacket.enabled;
  //       setForceRender((prevState) => !prevState);
  //     });
  // };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      refreshdata(false);
      let endPoint = `${currentInstitute}/guest-users/${deleteId}`;
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
              text: "User has been successfully removed",
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
    firstName,
    lastName,
    email,
    country,
    instituteIds,
  }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      firstName,
      lastName,
      email,
      country,
      instituteIds,
    });
    // refreshDepartmentData();
  };

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
        <TimerAlertBox
          alertMsg={alertMsg.message}
          className="mt-3"
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
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
        titlePrefix="Remove"
        atertMessage="Are you sure, you want to remove."
      />
    </React.Fragment>
  );
};

export default GuestUsersTable;
