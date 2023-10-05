import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Errordiv from "../../../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../../widgets/alert/deleteAlert";
import { deleteData } from "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import editIcon from "../../../../../assets/images/icons/edit-action.svg";
// import showIcon from "../../../../assets/images/icons/show-action.svg";
// import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import deleteIcon from "../../../../../assets/images/icons/delete-action.svg";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const ManageTimesSlotTable = ({
  apiStatus,
  timeslotList,
  editHandlerById,
  toggleModalShow,
  refreshOnDelete,
  currentInstitute,
  refreshTimeslotData,
}: any) => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Time / Day",
      //   accessor: "name",
      Cell: ({ row }: any) => {
        return (
          <span>{`${
            row.original.startTime !== null ? row.original.startTime : "00:00"
          } - ${
            row.original.endTime !== null ? row.original.endTime : "00:00"
          }`}</span>
        );
      },
    },
    // {
    //   Header: "Weight",
    //   accessor: "",
    // },
    {
      Header: "Break",
      // accessor: "type",
      Cell: ({ row }: any) => {
        return row.original.type !== null &&
          row.original.type.charAt(0).toUpperCase() +
            row.original.type.slice(1);
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link className="action-icons" to="">
            <img
              src={editIcon}
              alt="Edit"
              onClick={() =>
                editHandler({
                  id: row.original.id,
                  startTime: row.original.startTime,
                  endTime: row.original.endTime,
                  type: row.original.type,
                  breakTime: row.original.breakTime,
                })
              }
            />
          </Link>
          <Link
            className={`action-icons ${
              row.original.totalPrograms > 0 ? "disabled" : ""
            }`}
            to=""
          >
            <img
              src={deleteIcon}
              alt="Delete"
              onClick={() =>
                row.original.id > 0 ? deleteHandler(row.original.id) : null
              }
            />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => timeslotList, [timeslotList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);

  // edit event handler === >>>
  const editHandler = ({ id, startTime, endTime, type, breakTime }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      startTime,
      endTime,
      type,
      breakTime,
    });
    refreshTimeslotData();
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint: string = `${currentInstitute}/timetable/timeslot/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
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
              message: "Unable to delete, some error occurred.",
              alertBoxColor: "danger",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: result.message,
              alertBoxColor: "danger",
            });
          } else {
            setShowAlert(true);
            setAlertMsg({
              message: result.message,
              alertBoxColor: "danger",
            });
          }
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    refreshOnDelete(false);
    setShowDeleteModal(true);
    setDeleteId(id);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
        <TimerAlertBox
          className="mt-3"
          showAlert={showAlert}
          alertMsg={alertMsg.message}
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
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
        {apiStatus === "started" && timeslotList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && timeslotList.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        modalHeading="Department"
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
      />
    </React.Fragment>
  );
};

export default ManageTimesSlotTable;
