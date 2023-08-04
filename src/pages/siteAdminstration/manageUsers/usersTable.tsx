import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
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
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" onClick={() => deleteHandler(row.original.userId)} />
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
    console.log(id, userEmail, roleNumber, roleId)
  };

  useEffect(()=>{
    if (onDeleteAction === "Yes") {
      refreshdata(false);
      let endPoint = `/program/${programid}/enrol-user/${deleteId}`;
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
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
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

export default UsersTable;
