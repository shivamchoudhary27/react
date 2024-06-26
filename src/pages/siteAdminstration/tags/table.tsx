import Swal from "sweetalert2";
import { useTable } from "react-table";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch } from "react-redux";
import Errordiv from "../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../widgets/skeleton/table";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import { globalAlertActions } from "../../../store/slices/globalAlerts";
import {
  putData,
  deleteData as deleteTagData,
} from "../../../adapters/microservices";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const TagsTable = ({
  allTags,
  apiStatus,
  toggleModalShow,
  editHandlerById,
  userPermissions,
  currentInstitute,
  updateDeleteRefresh,
}: any) => {
  const tableColumn = [
    {
      Header: "Tags Name",
      accessor: "name",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {userPermissions.canEdit === true && (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Update Tag</BsTooltip>}
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
          {userPermissions.canDelete === true && (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Delete Tag</BsTooltip>}
             >
            <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.id)}
              />
            </Link>
            </OverlayTrigger>
          )}
          {userPermissions.canEdit === true && (
              <OverlayTrigger
              placement="top"
              overlay={<BsTooltip>Hide/Unhide Tag</BsTooltip>}
             >
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleTagsPublished(row.original);
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
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => allTags, [allTags]);
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

  const editHandler = ({ id, name, published }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name, published });
  };

  const toggleTagsPublished = (tagPacket: any) => {
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
            alertMsg: "Some error occurred!",
            status: true,
          })
        );
        tagPacket.published = !tagPacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `${currentInstitute}/tags/${deleteId}`;
      deleteTagData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            updateDeleteRefresh(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Tag has been successfully deleted"
            });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message:
                "Unable to delete, this tag might have been used in some programs.",
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

  const deleteHandler = (id: number) => {
    updateDeleteRefresh(false);
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
        {apiStatus === "started" && allTags.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && allTags.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Tag"
      />
      <TimerAlertBox
        className="mt-3"
        showAlert={showAlert}
        alertMsg={alertMsg.message}
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
      />
    </React.Fragment>
  );
};

export default TagsTable;
