import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../store/actions";
import MobileProgramTable from "./view/mobile/table";
import BrowserProgramTable from "./view/browser/table";
import { isMobile, isDesktop } from "react-device-detect";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import {
  putData,
  deleteData as deleteProgramData,
} from "../../../adapters/microservices";
import {
  Type_AlertMsg,
  Type_ProgramTypeObject,
  Type_ProgramtypePacket,
} from "./type/types";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

type Props = {
  apiStatus: string;
  filterUpdate: any;
  setFilterUpdate: any;
  programTypeData: any;
  currentInstitute: number;
  programtypePermissions: any;
  refreshProgramData: () => void;
  toggleModalShow: (params: boolean) => void;
  refreshOnDelete: (params: boolean) => void;
  editHandlerById: (params: Type_ProgramTypeObject) => void;
};

const ProgramTable: React.FunctionComponent<Props> = ({ ...props }: Props) => {

  const { handleTableSorting } = useTableSorting();

  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("name", props.setFilterUpdate)}
          >
           <span> Name</span>
          <span>
            {props.filterUpdate.sortBy === "name" &&
            props.filterUpdate.sortOrder === "asc" ? (
              <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                    </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "name" &&
              props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Name Descending </BsTooltip>}
                ><button className="btn btn-link text-white p-0">
                <TbSortDescending />
                </button>
                </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Name Ascending </BsTooltip>}
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
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Program Attached",
      accessor: "totalPrograms",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {props.programtypePermissions.canEdit === true && (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Update Program Type</BsTooltip>}
             >
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    name: row.original.name,
                    description: row.original.description,
                    batchYearRequired: row.original.isBatchYearRequired,
                    published: row.original.published,
                  })
                }
              />
            </Link>
            </OverlayTrigger>
          )}{" "}
          {props.programtypePermissions.canDelete === true && (
            <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Delete Program Type</BsTooltip>}
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
          )}{" "}
          {props.programtypePermissions.canEdit === true && (
            <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Hide/Unhide Program Type</BsTooltip>}
            >
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleProgramtypePublished(row.original);
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
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, [props.filterUpdate]);
  const data = useMemo(() => props.programTypeData, [props.programTypeData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<Type_AlertMsg>({
    message: "",
    alertBoxColor: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [onDeleteAction, setOnDeleteAction] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);
  const [forceRender, setForceRender] = useState(false);

  // edit event handler === >>>
  const editHandler = ({ ...getEditHandlerValue }: Type_ProgramTypeObject) => {
    props.toggleModalShow(true);
    props.editHandlerById({
      id: getEditHandlerValue.id,
      name: getEditHandlerValue.name,
      published: getEditHandlerValue.published,
      description: getEditHandlerValue.description,
      batchYearRequired: getEditHandlerValue.batchYearRequired,
    });
    props.refreshProgramData();
  };

  const toggleProgramtypePublished = (
    programtypePacket: Type_ProgramtypePacket
  ) => {
    programtypePacket.published = !programtypePacket.published;
    setForceRender((prevState) => !prevState);
    let endPoint: string = `/${props.currentInstitute}/program-types/${programtypePacket.id}`;
    putData(endPoint, programtypePacket)
      .then((res: any) => {
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        dispatch({
          type: ACTIONSLIST.mitGlobalAlert,
          alertMsg: "Action failed due to some error",
          status: true,
        });
        programtypePacket.published = !programtypePacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endpoint: string = `/${props.currentInstitute}/program-types/${deleteId}`;
      deleteProgramData(endpoint)
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
              text: "Program type has been successfully deleted"
            });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message:
                "Unable to delete, this program might have been used in some programs.",
              alertBoxColor: "danger",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: `${result.message} Unable to delete! Please try again.`,
              alertBoxColor: "danger",
            });
          } else {
            setShowAlert(true);
            setAlertMsg({
              message: `${result.message} Unable to delete! Please try again.`,
              alertBoxColor: "danger",
            });
          }
        });
      setTimeout(() => {
        props.refreshProgramData();
      }, 3000);
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    props.refreshOnDelete(false);
    setShowDeleteModal(true);
    setDeleteId(id);
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
    programTypeData: props.programTypeData,
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
        <MobileProgramTable commonProps={commonProps} />
      ) : isDesktop ? (
        <BrowserProgramTable commonProps={commonProps} />
      ) : (
        <BrowserProgramTable commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default ProgramTable;
