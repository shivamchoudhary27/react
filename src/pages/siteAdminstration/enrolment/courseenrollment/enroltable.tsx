import React, { useMemo, useState, useEffect } from "react";
import { deleteData as deleteDisciplineData } from "../../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const DiciplineTable = ({
  diciplineData,
  editHandlerById,
  toggleModalShow,
  refreshDisciplineData,
  refreshOnDelete,
  courseid,
  apiStatus
}: any) => {
  // custom react table column === >>>
  const tableColumn = [
    {
      Header: "First Name / Surname",
      Cell: ({ row }: any) =>
        `${row.original.userFirstName} ${row.original.userLastName}`,
    },
    {
      Header: "Email Address",
      accessor: "userEmail",
    },
    {
      Header: "Roles",
      Cell: ({ row }: any) =>
        `${
          row.original.userRole.charAt(0).toUpperCase() +
          row.original.userRole.slice(1)
        }`,
    },
    {
      Header: "Groups",
      Cell: ({row}: any) => (
        getCommaSeparatedNames(row.original.groups)
      )
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link className="action-icons" to="">
            <img src={editIcon} alt="Edit" onClick={() =>
                editHandler({
                  userId: row.original.userId,
                  userEmail: row.original.userEmail,
                  groups: row.original.groups,
                })
              } />
          </Link>
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" onClick={() => deleteHandler(row.original.userId)} />
          </Link>
          <Link className="action-icons" to="">
            <img src={showIcon} alt="Show" />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => diciplineData, [diciplineData]);
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
  const editHandler = ({ userId, userEmail, groups }: any) => {
    toggleModalShow(true);
    editHandlerById({ userId, userEmail, groups });
    // refreshDisciplineData();
  };

  useEffect(()=>{
    if (onDeleteAction === "Yes") {
      let endpoint = `/course/${courseid}/enrol-user/${deleteId}`;
      deleteDisciplineData(endpoint)
        .then((res: any) => {
          console.log(res);
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully!",
              alertBoxColor: "success",
            });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete",
              alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          console.log(result);
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.data.message,
              alertBoxColor: "success",
            });
          } else {
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

  // delete event handler === >>>
  const deleteHandler = (userId: number) => {
    refreshOnDelete(false);
    setShowDeleteModal(true);
    setDeleteId(userId);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    console.log(action);
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  const getCommaSeparatedNames = (arr : any) => {
    return arr.map((obj :any) => obj.name).join(", ");
  }
  return (
    <React.Fragment>
      <div className="table-wrapper mt-3">
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
        {apiStatus === "started" && diciplineData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && diciplineData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Enrol User"
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

export default DiciplineTable;
