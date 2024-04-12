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

const HolidaysTable = ({
  apiStatus,
  holidaysData,
  filterUpdate,
  editHandlerById,
  toggleModalShow,
  refreshOnDelete,
  currentInstitute,
  refreshHolidaysData,
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
         <span> Holiday Name </span>
        <span>
          {filterUpdate.sortBy === "name" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Holiday Name Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "name" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Holiday Name Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Holiday Name Ascending </BsTooltip>}
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
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("holidayDate", setFilterUpdate)}
        >
         <span> Date </span>
        <span>
          {filterUpdate.sortBy === "holidayDate" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Date Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "holidayDate" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Date Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Date Ascending </BsTooltip>}
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
      accessor: "holidayDate",
    },
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("year", setFilterUpdate)}
        >
         <span> Year </span>
        <span>
          {filterUpdate.sortBy === "year" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Year Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "year" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Year Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Year Ascending </BsTooltip>}
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
      accessor: "year",
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
                  year: row.original.year,
                  holidayDate: row.original.holidayDate,
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
          <Link className="action-icons" to="">
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
  const data = useMemo(() => holidaysData, [holidaysData]);
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
  const editHandler = ({ id, name, year, holidayDate }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      name,
      year,
      holidayDate,
    });
    refreshHolidaysData();
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint: string = `${currentInstitute}/timetable/holiday/${deleteId}`;
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
              text: "Holidays has been successfully deleted"
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
        {apiStatus === "started" && holidaysData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && holidaysData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        modalHeading="Holiday"
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
      />
    </React.Fragment>
  );
};

export default HolidaysTable;
