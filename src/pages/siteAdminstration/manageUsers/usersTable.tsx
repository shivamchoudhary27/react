import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { deleteData } from "../../../adapters/microservices";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";       
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";


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
  setFilterUpdate,
  filterUpdate,
  apiStatus
}: any) => {

  const { handleTableSorting } = useTableSorting();
  const tableColumn = [
    {Header:(  
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
      Cell: ({ row }: any) => (
        <>
          {`${row.original.userFirstName.charAt(0).toUpperCase()}${row.original.userFirstName.slice(1)} `}
        </>
      ),
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
      Cell: ({ row }: any) => (
        <>
          {`${row.original.userLastName.charAt(0).toUpperCase()}${row.original.userLastName.slice(1)}`}
        </>
      ),
    },
    
    
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("userEmail", setFilterUpdate)}
        >
         <span> Email </span>
        <span>
          {filterUpdate.sortBy === "userEmail" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Email Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0"	 >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "userEmail" &&
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
      accessor: "userEmail",
    },
    {
       Header:(  
      <div className="d-flex align-items-center">
      <span
        onClick={() => handleTableSorting("roleNumber", setFilterUpdate)}
      >
       <span> Role No </span>
      <span>
        {filterUpdate.sortBy === "roleNumber" &&
        filterUpdate.sortOrder === "asc" ? (
          <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Sorted by Role No Ascending </BsTooltip>} 
            >
              <button className="btn btn-link text-white p-0"	 >
                <TbSortAscending />
                </button>
            </OverlayTrigger>
          ) : filterUpdate.sortBy === "roleNumber" &&
          filterUpdate.sortOrder === "desc" ? (
            <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Sorted by Role No Descending </BsTooltip>}
            ><button className="btn btn-link text-white p-0" >
            <TbSortDescending />
            </button>
            </OverlayTrigger>
            ) : (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Sort by Role No Ascending </BsTooltip>}
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
      accessor: "roleNumber",
    },
    {
      Header: "Role",
      accessor: "roleName"
      // Cell: ({ row }: any) => userRoleString(row.original.role),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <OverlayTrigger
        placement="top"
        overlay={<BsTooltip>Update User Details</BsTooltip>}
        trigger={["hover", "focus"]}
       >

          <Link
            className="action-icons" 
            to=""
            // to={createEditLink(row.original.userId)}
            >
            <img src={editIcon} alt="Edit" onClick={() =>
                editHandler(
                  row.original.userId,
                  row.original.userEmail,
                  row.original.roleNumber,
                  row.original.roleId
                  )
                } />
          </Link>
                </OverlayTrigger>
          <OverlayTrigger
        placement="top"
        overlay={<BsTooltip>Delete User</BsTooltip>}
        trigger={["hover", "focus"]}
       >
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" onClick={() => deleteHandler(row.original.userId)} />
          </Link>
        </OverlayTrigger>
        </span>
      ),
    },
  ];

  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => enrolleduserdata, [enrolleduserdata]);
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

  const editHandler = (id: number, userEmail: string, roleNumber: string, roleId: string) => {
    AddUsersModalShow(true)
    editHandlerById(id, userEmail, roleNumber, roleId);
  };

  useEffect(()=>{
    if (onDeleteAction === "Yes") {
      refreshdata(false);
      let endPoint = `/program/${programid}/enrol-user/${deleteId}`;
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
    setOnDeleteAction(action);
    setShowDeleteModal(false);
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
        <Table borderless striped {...getTableProps()}>
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
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="User"
      />
      
    </React.Fragment>
  );
};

export default UsersTable;
