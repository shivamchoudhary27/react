import Swal from "sweetalert2";
import { useTable } from "react-table";
import { useDispatch } from "react-redux";
import "sweetalert2/src/sweetalert2.scss";
import { Link, useNavigate } from "react-router-dom";
import MobileDepartmentTable from "./view/mobile/table";
import BrowserDepartmentTable from "./view/browser/table";
import { isMobile, isDesktop } from "react-device-detect";
import React, { useMemo, useState, useEffect } from "react";
import { Type_AlertMsg, Type_DepartmentObj } from "./type/type";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import { globalAlertActions } from "../../../store/slices/globalAlerts";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import { globalFilterActions } from "../../../store/slices/globalFilters";
import programIcon from "../../../assets/images/icons/manage-program-action.svg";
import {
  putData,
  deleteData as deleteDepartmentData,
} from "../../../adapters/microservices";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";

type Props = {
  permissions: any;
  filterUpdate:any;
  apiStatus: string;
  departmentData: any;
  setFilterUpdate:any;
  editHandlerById: any;
  currentInstitute: number;
  refreshDepartmentData: () => void;
  refreshOnDelete: (param: boolean) => void;
  toggleModalShow: (param: boolean) => void;
};

const DepartmentTable: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {

  const { handleTableSorting } = useTableSorting();
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("department", props.setFilterUpdate)}
          >
           <span> Department </span>
          <span>
            {props.filterUpdate.sortBy === "department" &&
            props.filterUpdate.sortOrder === "asc" ? (
              <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Department Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0" >
                    <TbSortAscending />
                    </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "department" &&
              props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Department Descending </BsTooltip>}
                ><button className="btn btn-link text-white p-0">
                <TbSortDescending />
                </button>
                </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Department Ascending </BsTooltip>}
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
      accessor: "name",
    },
    {
      Header: "Program Attached",
      accessor: "totalPrograms",
    },
    {
      Header: "Manage Programs",
      Cell: ({ row }: any) => (
        <OverlayTrigger
        placement="top"
        overlay={<BsTooltip>Add/Update Program</BsTooltip>}
       >
        <Link
          className="action-icons"
          to=""
          onClick={() => manageDepartmentPrograms(row.original.id)}
          >
          <img src={programIcon} alt="Manage Program" />
        </Link>
          </OverlayTrigger>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span className="d-flex align-items-center justify-content-evenly">
          {props.permissions.canEdit && (
               <OverlayTrigger
               placement="top"
               overlay={<BsTooltip>Update Department</BsTooltip>}
              >
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    name: row.original.name,
                    published: row.original.published,
                  })
                }
              />
            </Link>
            </OverlayTrigger>
          )}
          {props.permissions.canDelete && (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Delete Department</BsTooltip>}
             >
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
                  row.original.totalPrograms < 1
                    ? deleteHandler(row.original.id)
                    : null
                }
              />
            </Link>
            </OverlayTrigger>
          )}
          {props.permissions.canEdit && (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Hide/Unhide Department</BsTooltip>}
             >
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleDepartmentPublished(row.original);
              }}
            >
              <img
                src={row.original.published !== false ? showIcon : hideIcon}
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
  const columns = useMemo(() => tableColumn, [props.filterUpdate]);
  const data = useMemo(() => props.departmentData, [props.departmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<Type_AlertMsg>({
    message: "",
    alertBoxColor: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [onDeleteAction, setOnDeleteAction] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);
  const [forceRender, setForceRender] = useState<boolean>(false);

  // edit event handler === >>>
  const editHandler = ({ id, name, published }: Type_DepartmentObj) => {
    props.toggleModalShow(true);
    props.refreshDepartmentData();
    props.editHandlerById({ id, name, published });
  };

  const toggleDepartmentPublished = (departmentPacket: any) => {
    departmentPacket.published = !departmentPacket.published;
    setForceRender((prevState) => !prevState);
    let endPoint = `/${props.currentInstitute}/departments/${departmentPacket.id}`;
    putData(endPoint, departmentPacket)
      .then((res: any) => {
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        dispatch(
          globalAlertActions.globalAlert({
            alertMsg: "Action failed due to some error",
            status: true,
          })
        );
        departmentPacket.published = !departmentPacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint: string = `${props.currentInstitute}/departments/${deleteId}`;
      deleteDepartmentData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.refreshOnDelete(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Department has been successfully deleted."
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

  const manageDepartmentPrograms = (id: number) => {
    dispatch(globalFilterActions.currentDepartment(id));
    setTimeout(() => {
      navigate("/manageprogram");
    }, 400);
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
    props.refreshOnDelete(false);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  // common reusable props === >>>
  const commonProps = {
    rows: rows,
    alertMsg: alertMsg,
    showAlert: showAlert,
    headerGroups: headerGroups,
    apiStatus: props.apiStatus,
    showDeleteModal: showDeleteModal,
    departmentData: props.departmentData,
    prepareRow: prepareRow,
    setShowAlert: setShowAlert,
    getTableProps: getTableProps,
    getTableBodyProps: getTableBodyProps,
    setShowDeleteModal: setShowDeleteModal,
    deleteActionResponse: deleteActionResponse,
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileDepartmentTable commonProps={commonProps} />
      ) : isDesktop ? (
        <BrowserDepartmentTable commonProps={commonProps} />
      ) : (
        <BrowserDepartmentTable commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default DepartmentTable;
