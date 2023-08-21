import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Type_AlertMsg } from "./type/type";
import MobileDiciplineTable from "./view/mobile/table";
import BrowserDiciplineTable from "./view/browser/table";
import { isMobile, isDesktop } from "react-device-detect";
import React, { useState, useMemo, useEffect } from "react";
import { Interface_DisciplineCustomObject } from "./type/interface";
import { globalAlertActions } from "../../../store/slices/globalAlerts";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import {
  putData,
  deleteData as deleteDisciplineData,
} from "../../../adapters/microservices";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

type props = {
  apiStatus: string;
  diciplineData: any;
  toggleModalShow: any;
  currentInstitute: number;
  disciplinePermissions: any;
  refreshDisciplineData: () => void;
  refreshOnDelete: (params: boolean) => void;
  editHandlerById: (params: Interface_DisciplineCustomObject) => void;
};

const DiciplineTable: React.FunctionComponent<props> = ({
  ...props
}: props) => {
  // custom react table column === >>>
  const tableColumn = [
    {
      Header: "Name",
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
          {props.disciplinePermissions.canEdit === true && (
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    name: row.original.name,
                    description: row.original.description,
                    published: row.original.published,
                  })
                }
              />
            </Link>
          )}
          {props.disciplinePermissions.canDelete === true && (
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
          )}{" "}
          {props.disciplinePermissions.canEdit === true && (
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleDisciplinePublished(row.original);
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

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => props.diciplineData, [props.diciplineData]);
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
  const editHandler = ({
    id,
    name,
    description,
    published,
  }: Interface_DisciplineCustomObject) => {
    props.toggleModalShow(true);
    props.editHandlerById({ id, name, description, published });
    props.refreshDisciplineData();
  };

  const toggleDisciplinePublished = (disciplinePacket: any) => {
    disciplinePacket.published = !disciplinePacket.published;
    setForceRender((prevState) => !prevState);
    let endPoint: string = `/${props.currentInstitute}/disciplines/${disciplinePacket.id}`;
    putData(endPoint, disciplinePacket)
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
        disciplinePacket.published = !disciplinePacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endpoint: string = `${props.currentInstitute}/disciplines/${deleteId}`;
      deleteDisciplineData(endpoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.refreshOnDelete(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully.",
              alertBoxColor: "success",
            });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete! Please try again.",
              alertBoxColor: "danger",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: `${result.response.data.message} Unable to delete! Please try again.`,
              alertBoxColor: "danger",
            });
          } else {
            setShowAlert(true);
            setAlertMsg({
              message: `${result.response.data.message} Unable to delete! Please try again.`,
              alertBoxColor: "danger",
            });
          }
        });
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

  const commonProps = {
    rows: rows,
    alertMsg: alertMsg,
    showAlert: showAlert,
    apiStatus: props.apiStatus,
    headerGroups: headerGroups,
    showDeleteModal: showDeleteModal,
    diciplineData: props.diciplineData,
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
        <MobileDiciplineTable commonProps={commonProps} />
      ) : isDesktop ? (
        <BrowserDiciplineTable commonProps={commonProps} />
      ) : (
        <BrowserDiciplineTable commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default DiciplineTable;
