import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Errordiv from "../../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import { deleteData, putData } from "../../../../adapters/microservices";
import { globalAlertActions } from "../../../../store/slices/globalAlerts";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";
type Props = {
  topicData: any[];
  apiStatus: string;
  permissions: any;
  refreshdata: any;
  toggleModalShow: any;
  editHandlerById: any;
  filterUpdate: any;
  setFilterUpdate: any;
};

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
};

const ManageTopicTable = (props: Props) => {

  const { handleTableSorting } = useTableSorting();

  const tableColumn = [
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() =>
              handleTableSorting("topicName", props.setFilterUpdate)
            }
          >
            <span> Topic </span>
            <span>
              {props.filterUpdate.sortBy === "topicName" &&
              props.filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Topic Name Ascending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "topicName" &&
                props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Topic Name Descending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Topic Name Ascending </BsTooltip>}
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
      accessor: "topicName",
    },
    {
      Header: "Description",
      accessor: "description",
    },

    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {props.permissions.canEdit && (
            <Link className="action-icons" to={""}>
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    topicName: row.original.topicName,
                    description: row.original.description,
                    published: row.original.published,
                  })
                }
              />
            </Link>
          )}

          {props.permissions.canDelete && (
            <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.id)}
              />
            </Link>
          )}

          {props.permissions.canEdit && (
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleTopicPublished(row.original);
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
  const [deleteId, setDeleteId] = useState(0);
  const columns = useMemo(() => tableColumn, [props.filterUpdate]);
  const data = useMemo(() => props.topicData, [props.topicData]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [topicToggle, setTopicToggle] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      props.refreshdata(false);
      let endPoint = `/topic/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            props.refreshdata(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Topic has been successfully deleted"
            });
          } else if (res.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete, some error occured",
              alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.data.message,
              alertBoxColor: "success",
            });
          } else if (result.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: result.response.data.message,
              alertBoxColor: "success",
            });
          }
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  const deleteHandler = (userid: number) => {
    // refreshdata(false);
    setShowDeleteModal(true);
    setDeleteId(userid);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  // edit event handler === >>>
  const editHandler = ({ id, topicName, description, published }: any) => {
    props.toggleModalShow(true);
    props.editHandlerById({
      id,
      topicName,
      description,
      published,
    });
  };

 
  const toggleTopicPublished = (programPacket: any) => {
    programPacket.published = !programPacket.published;
    setTopicToggle(prevState => !prevState);
    let endPoint = `/topic/${programPacket.id}`;
    putData(endPoint, programPacket)
      .then((res: any) => {
        setTopicToggle(prevState => !prevState);
      })
      .catch((err: any) => {
        dispatch(
          globalAlertActions.globalAlert({
            alertMsg: "Action failed due to some error",
            status: true,
          })
        );
        programPacket.published = !programPacket.published;
        setTopicToggle(prevState => !prevState);
      });
  };

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
        <TimerAlertBox
          className="mt-3"
          showAlert={showAlert}
          alertMsg={alertMsg.message}
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
        />
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
        {props.apiStatus === "started" && props.topicData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {props.apiStatus === "finished" && props.topicData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Topic"
      />
    </React.Fragment>
  );
};

export default ManageTopicTable;
