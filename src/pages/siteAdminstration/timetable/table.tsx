import { useTable } from "react-table";
import { Link } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import Errordiv from "../../../widgets/alert/errordiv";
import React, { useMemo, useEffect, useState } from "react";
import TableSkeleton from "../../../widgets/skeleton/table";
import { deleteData } from "../../../adapters/microservices";
// import DeleteAlert from "../../../widgets/alert/deleteAlert";
import manageCoursesIcon from "../../../assets/images/icons/manage-courses-action.svg";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";
import { OverlayTrigger, Table,Tooltip as BsTooltip } from "react-bootstrap";


// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

type Props = {
  // permissions: any;
  apiStatus: string;
  timeTableData: any;
  editHandlerById: any;
  currentInstitute: number;
  setFilterUpdate:any;
  filterUpdate:any;
  refreshOnDelete: (param: boolean) => void;
};

const TimetableTable: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {

  const { handleTableSorting } = useTableSorting();
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("name", props.setFilterUpdate)}
        >
         <span> Programs </span>
        <span>
          {props.filterUpdate.sortBy === "name" &&
          props.filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Programs Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : props.filterUpdate.sortBy === "name" &&
            props.filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Programs Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Programs Ascending </BsTooltip>}
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
          onClick={() => handleTableSorting("batchYear", props.setFilterUpdate)}
        >
         <span> Batch Year </span>
        <span>
          {props.filterUpdate.sortBy === "batchYear" &&
          props.filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Batch Year Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : props.filterUpdate.sortBy === "batchYear" &&
            props.filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Batch Year Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Batch Year Ascending </BsTooltip>}
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
      accessor: "batchYear",
    },
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("programCode", props.setFilterUpdate)}
        >
         <span> Program code </span>
        <span>
          {props.filterUpdate.sortBy === "programCode" &&
          props.filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Program code Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : props.filterUpdate.sortBy === "programCode" &&
            props.filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Program code Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Program code Ascending </BsTooltip>}
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
      accessor: "programCode",
    },
    {
      Header: "Course Work Load",
      accessor: "manage_courses",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/managecoursesworkload/${row.original.id}/${row.original.name}`}
        >
          <img src={manageCoursesIcon} alt="Manage Courses" />
        </Link>
      ),
    },
    {
      Header: "Draft Version",
      accessor: "",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/draftversion?dpt=${row.original.department.id}&prgId=${row.original.id}&prg=${row.original.name}`}
        >
          <img src={manageCoursesIcon} alt="Manage Draft" />
        </Link>
      ),
    },
    {
      Header: "Faculty Change Request",
      accessor: "",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/facultyChange?dpt=${row.original.department.id}&prgId=${row.original.id}&prg=${row.original.name}`}
        >
          <img src={manageCoursesIcon} alt="Manage Draft" />
        </Link>
      ),
    },
    {
      Header: "Publish",
      accessor: "",
    },
    {
      Header: "View Timetable",
      accessor: "",
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, [props.filterUpdate]);
  const data = useMemo(() => props.timeTableData, [props.timeTableData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState({ id: 0, instituteId: 0 });

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `/${deleteId.instituteId}/programs/${deleteId.id}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.refreshOnDelete(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully",
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
              message: result.response.data.message,
              alertBoxColor: "danger",
            });
          } else if (result.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  const deleteHandler = (id: number, instituteId: number) => {
    props.refreshOnDelete(false);
    setShowDeleteModal(true);
    setDeleteId({ id: id, instituteId: instituteId });
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
          {data.length > 0 && (
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
          )}
        </Table>
        {props.apiStatus === "started" && props.timeTableData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {props.apiStatus === "finished" && props.timeTableData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      {/* <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Program"
      /> */}
    </React.Fragment>
  );
};

export default TimetableTable;
