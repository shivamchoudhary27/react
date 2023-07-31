import React, { useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import { putData, deleteData } from "../../../../adapters/microservices";
import Errordiv from "../../../../widgets/alert/errordiv";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../../../store/slices/globalAlerts";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const ManageGroupTable = ({
  manageGroupList,
  courseid,
  refreshOnDelete,
  setModalShow,
  editHandlerById,
  refreshGroupData,
  apiStatus,
  currentInstitute,
  userPermissions,
}: any) => {
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
      Header: "Total Members",
      accessor: "totalMembers",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {userPermissions.canEdit === true && (
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    name: row.original.name,
                    description: row.original.description,
                  })
                }
              />
            </Link>
          )}
          {userPermissions.canDelete === true && (
            <Link
              className={`action-icons ${
                row.original.totalMembers > 0 ? "delete-disabled" : ""
              }`}
              to=""
            >
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() =>
                  row.original.totalMembers < 1
                    ? deleteHandler(row.original.id)
                    : null
                }
              />
            </Link>
          )}{" "}
          {userPermissions.canEdit === true && (
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleGroupPublished(row.original);
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
  const data = useMemo(() => manageGroupList, [manageGroupList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [forceRender, setForceRender] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

  // update event handler
  const editHandler = ({ id, name, description }: any) => {
    setModalShow(true);
    editHandlerById({ id, name, description });
    refreshGroupData();
  };

  const toggleGroupPublished = (tagPacket: any) => {
    tagPacket.published = !tagPacket.published;
    setForceRender((prevState) => !prevState);
    let endPoint = `/${currentInstitute}/tags/${tagPacket.id}`;
    putData(endPoint, tagPacket)
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
        tagPacket.published = !tagPacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  // delete event handler === >>>
  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `/${courseid}/group/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully!",
              alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            dispatch(
              globalAlertActions.globalAlert({
                alertMsg: result.response.data.message,
                status: true,
              })
            );
          } else if (result.response.status === 500) {
            dispatch(
              globalAlertActions.globalAlert({
                alertMsg: "Unable to delete, some error occurred",
                status: true,
              })
            );
          } else {
            dispatch(
              globalAlertActions.globalAlert({
                alertMsg: result.response.data.message,
                status: true,
              })
            );
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
        {apiStatus === "started" && manageGroupList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && manageGroupList.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
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

export default ManageGroupTable;
