import { useMemo, useState, useEffect } from "react";
import { OverlayTrigger, Table, Tooltip,Tooltip as BsTooltip } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import {
  deleteData as deleteProgramData,
  putData,
} from "../../../adapters/microservices";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import manageCategoryIcon from "../../../assets/images/icons/manage-category-action.svg";
import manageCoursesIcon from "../../../assets/images/icons/manage-courses-action.svg";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../../store/slices/globalAlerts";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";


// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
};

const ManageTable = ({
  programData,
  refreshOnDelete,
  apiStatus,
  currentInstitute,
  programPermissions,
  setFilterUpdate,
  filterUpdate,
}: any) => {


  const { handleTableSorting } = useTableSorting();

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
      Cell: ({ row }: any) => (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="button-tooltip-2">Program preview</Tooltip>}
        >
          <Link to={createPreviewLink(row.original.id, row.original.instituteId)} className="action-icons">
            {row.original.name}
          </Link>
        </OverlayTrigger>
      ),
    },
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("batchYear", setFilterUpdate)}
        >
         <span> Batch Year </span>
        <span>
          {filterUpdate.sortBy === "batchYear" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Batch Year Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "batchYear" &&
            filterUpdate.sortOrder === "desc" ? (
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
          onClick={() => handleTableSorting("programCode", setFilterUpdate)}
        >
         <span> Program Code </span>
        <span>
          {filterUpdate.sortBy === "programCode" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Program Code Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0" >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "programCode" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Program Code Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Program Code Ascending </BsTooltip>}
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
      Cell: ({ value }: any) => value.toUpperCase(),
    },
    {
      Header: "Manage Categories",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/managecategory/${row.original.id}/${row.original.name}`}
        >
          <img src={manageCategoryIcon} alt="Manage Categories" />
        </Link>
      ),
    },
    {
      Header: "Manage Courses",
      accessor: "manage_courses",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/managecourses/${row.original.id}/${row.original.name}`}
        >
          <img src={manageCoursesIcon} alt="Manage Courses" />
        </Link>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {programPermissions.canEdit && (
            <Link
              className="action-icons m-1"
              to={createEditLink(row.original.id, row.original.instituteId)}
            >
              <img src={editIcon} alt="Edit" />
            </Link>
          )}
          {programPermissions.canDelete && (
            <Link className="action-icons m-1" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() =>
                  deleteHandler(row.original.id, row.original.instituteId)
                }
              />
            </Link>
          )}
          {programPermissions.canEdit && (
            <Link
              className="action-icons m-1"
              to=""
              onClick={() => {
                toggleProgramPublished(row.original);
              }}
            >
              <img
                src={row.original.published !== false ? showIcon : hideIcon}
                alt="Show"
              />
            </Link>
          )}
        </span>
      ),
    },
  ];
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => programData, [programData]);
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

  const createPreviewLink = (id: number, instituteId: number) => {
    return `/programpreview/${id}`;
  };

  const createEditLink = (id: number, instituteId: number) => {
    return `/addprogram/${id}`;
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `/${deleteId.instituteId}/programs/${deleteId.id}`;
      deleteProgramData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
            setShowAlert(true);
            
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

  const toggleProgramPublished = (programPacket: any) => {
    programPacket.published = !programPacket.published;
    let endPoint = `/${currentInstitute}/programs/${programPacket.id}`;
    putData(endPoint, programPacket)
      .then((res: any) => {})
      .catch((err: any) => {
        dispatch(
          globalAlertActions.globalAlert({
            alertMsg: "Action failed due to some error",
            status: true,
          })
        );
        programPacket.published = !programPacket.published;
      });
  };

  const deleteHandler = (id: number, instituteId: number) => {
    refreshOnDelete(false);
    setShowDeleteModal(true);
    setDeleteId({ id: id, instituteId: instituteId });
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  return (
    <>
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
          {programData.length > 0 && (
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
        {apiStatus === "started" && programData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && programData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Program"
      />
      
    </>
  );
};

export default ManageTable;
