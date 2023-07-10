import React, { useMemo, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import { deleteData, putData } from "../../../../adapters/coreservices";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
// import { putData } from "../../../../adapters/microservices";
import { IUserData, IUserObj, IAlertMsg } from "./interfaces";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const RolesTable = ({
  userData,
  refreshOnDeleteToggle,
  currentInstitute,
  apiStatus,
  editHandlerById,
  setAddRoleModalShow,
  getRoleId,
}: any) => {
  const tableColumn = [
    {
      Header: "Role Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Permission",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to={`/rolepermissions/${row.original.id}/${row.original.name}`}
        >
          View Permission
        </Link>
      ),
    },
    {
      Header: "Context Type",
      accessor: "contextType",
      Cell: ({ row }: any) =>
        row.original.contextType !== null &&
        row.original.contextType.charAt(0).toUpperCase() +
          row.original.contextType.slice(1),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link className="action-icons" to={""}>
            <img
              src={editIcon}
              alt="Edit"
              onClick={() =>
                editHandler({
                  id: row.original.id,
                  name: row.original.name,
                  description: row.original.description,
                  contextType: row.original.contextType,
                  published: row.original.published,
                })
              }
            />
          </Link>
          <Link className="action-icons" to="">
            <img
              src={deleteIcon}
              alt="Delete"
              onClick={() => deleteHandler(row.original.id)}
            />
          </Link>
          {/* <Link
            className="action-icons"
            to=""
            onClick={() => toggleRolePublished(row.original)}
          >
            <img
              src={row.original.enabled !== false ? showIcon : hideIcon}
              alt="Show"
            />
          </Link> */}
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => userData, [userData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<IAlertMsg>({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [onDeleteAction, setOnDeleteAction] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);
  const [forceRender, setForceRender] = useState<boolean>(false);

  const toggleRolePublished = (rolePacket: any) => {
    rolePacket.published = !rolePacket.published;
    setForceRender((prevState) => !prevState);
    let endPoint = `/${currentInstitute}/roles/${rolePacket.id}`;
    putData(endPoint, rolePacket)
      .then((res: any) => {
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        dispatch({
          type: ACTIONSLIST.mitGlobalAlert,
          alertMsg: "Action failed due to some error",
          status: true,
        });
        rolePacket.published = !rolePacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  // edit event handler === >>>
  const editHandler = ({
    id,
    name,
    description,
    contextType,
    published,
  }: IUserObj) => {
    setAddRoleModalShow(true);
    refreshOnDeleteToggle(true);
    editHandlerById({ id, name, description, contextType, published });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `${currentInstitute}/roles/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDeleteToggle(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully!",
              alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          console.log(result);
          dispatch({
            type: ACTIONSLIST.mitGlobalAlert,
            alertMsg: "Unable to delete, some error occurred.",
            status: true,
          });
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    refreshOnDeleteToggle(false);
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
      <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
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
        {apiStatus === "started" && userData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && userData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Role"
      />
    </React.Fragment>
  );
};

export default RolesTable;