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
// import { putData } from "../../../../adapters/microservices";

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
        <Link className="action-icons" to={`/rolepermissions/${row.original.id}/${row.original.name}`}>
          View Permission
        </Link>
      ),
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [forceRender, setForceRender] = useState(false);

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
  const editHandler = ({ id, name, description, published }: any) => {
    setAddRoleModalShow(true);
    refreshOnDeleteToggle(true);
    editHandlerById({ id, name, description, published });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `${currentInstitute}/roles/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            console.log(deleteId + ": deleted------");
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
    console.log(id);
    refreshOnDeleteToggle(false);
    setShowDeleteModal(true);
    setDeleteId(id);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    console.log(action);
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
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Department"
      />
    </React.Fragment>
  );
};

export default RolesTable;
