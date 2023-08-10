import React, { useState, useMemo, useEffect } from "react";
import {
  putData,
  deleteData as deleteDisciplineData,
} from "../../../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
// import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import Errordiv from "../../../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import DeleteAlert from "../../../../../widgets/alert/deleteAlert";
import editIcon from "../../../../../assets/images/icons/edit-action.svg"
import deleteIcon from "../../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../../assets/images/icons/hide-action.svg";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../../../../store/slices/globalAlerts";
import { Interface_DisciplineCustomObject } from "../../type/interface";
import { Type_AlertMsg } from "../../type/type";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

type props = {
  diciplineData: any;
  editHandlerById: any;
  toggleModalShow: any;
  refreshDisciplineData: () => void;
  refreshOnDelete: (params: boolean) => void;
  apiStatus: string;
  currentInstitute: number;
  disciplinePermissions: any;
};

const MobileDiciplineTable: React.FunctionComponent<props> = ({...props}: props) => {
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

  return (
    <>
      <div className="table-responsive admin-table-wrapper mt-3">
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
        {props.apiStatus === "started" && props.diciplineData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {props.apiStatus === "finished" && props.diciplineData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Discipline"
      />
      <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </>
  );
};

export default MobileDiciplineTable;
