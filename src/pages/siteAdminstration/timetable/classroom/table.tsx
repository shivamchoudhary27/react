import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Errordiv from "../../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import { deleteData } from "../../../../adapters/microservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";
import { OverlayTrigger, Tooltip,Tooltip as BsTooltip } from "react-bootstrap";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const ClassRoomTable = ({
  apiStatus,
  classroomData,
  editHandlerById,
  toggleModalShow,
  refreshOnDelete,
  currentInstitute,
  refreshClassroomData,
  filterUpdate,
  setFilterUpdate,
}: any) => {

  const { handleTableSorting } = useTableSorting();

  // custom react table Column === >>>
  const tableColumn = [
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("name", setFilterUpdate)}
        >
         <span> Name </span>
        <span>
          {filterUpdate.sortBy === "name" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Name Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "name" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Name Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Name Ascending </BsTooltip>}
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
      accessor: "name",
    },
    {
      Header: "Seating Capacity",
      accessor: "seatingCapacity",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Department",
      accessor: "departmentName",
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
                  name: row.original.name,
                  type: row.original.type,
                  departmentId: row.original.departmentId,
                  departmentName: row.original.departmentName,
                  seatingCapacity: row.original.seatingCapacity,
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
          </Link>{" "}
          <Link
            className="action-icons"
            to=""
          >
            <img
              src={row.original.published !== false ? showIcon : hideIcon}
              alt="Show"
            />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => classroomData, [classroomData]);
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
  const editHandler = ({
    id,
    name,
    type,
    departmentId,
    departmentName,
    seatingCapacity,
  }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      name,
      type,
      departmentId,
      departmentName,
      seatingCapacity,
    });
    refreshClassroomData();
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint: string = `${currentInstitute}/timetable/classroom/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Classroom has been successfully deleted"
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
        {apiStatus === "started" && classroomData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && classroomData.length === 0 && (
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

export default ClassRoomTable;
