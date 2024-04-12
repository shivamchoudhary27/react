import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";
import { deleteData, putData } from "../../../../adapters/coreservices";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../../../store/slices/globalAlerts";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
// import { putData } from "../../../../adapters/microservices";
import { IUserData, IUserObj, IAlertMsg, IRoleTable } from "./types/interface";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";
import { isMobile } from 'react-device-detect';

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const RolesTable: React.FunctionComponent<IRoleTable> = ({
  userData,
  refreshOnDeleteToggle,
  currentInstitute,
  apiStatus,
  editHandlerById,
  setAddRoleModalShow,
  // getRoleId ,
  rolePermissions,
  setFilterUpdate,
  filterUpdate,
}: IRoleTable) => {

  const { handleTableSorting } = useTableSorting();
  const triggerType = isMobile ? 'focus' : 'hover';

  const tableColumn = [
    {
      Header:(  
        <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("name", setFilterUpdate)}
        >
         <span> Role Name </span>
        <span>
          {filterUpdate.sortBy === "name" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Role Name Ascending </BsTooltip>} 
              >
                <button className="btn btn-link text-white p-0"	 >
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "name" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Role Name Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0" >
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Role Name Ascending </BsTooltip>}
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
          {rolePermissions.canEdit && 
            <OverlayTrigger
            placement="top"
            overlay={<BsTooltip>Edit Role</BsTooltip>}
            trigger={triggerType}
           >
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
                    idNumber: row.original.idNumber,
                    shortName: row.original.shortName,
                  })
                }
                />
            </Link>
            </OverlayTrigger>
          }
          {rolePermissions.canDelete &&
            <OverlayTrigger
            placement="top"
            overlay={<BsTooltip>Delete Role</BsTooltip>}
            trigger={triggerType}
           >
            <Link className="action-icons" to="">
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() => deleteHandler(row.original.id)}
                />
            </Link>
            </OverlayTrigger>
          }
         
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
  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => userData, [userData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<IAlertMsg>({
    message: "",
    alertBoxColor: "",
  });
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
        dispatch(globalAlertActions.globalAlert({alertMsg: "Action failed due to some error", status: true}))
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
    idNumber,
    shortName
  }: IUserObj) => {
    setAddRoleModalShow(true);
    refreshOnDeleteToggle(true);
    editHandlerById({ id, name, description, contextType, published, idNumber, shortName });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `${currentInstitute}/roles/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDeleteToggle(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "role has been successfully deleted"
            
            // setShowAlert(true);
            // // setAlertMsg({
            // //   message: "Deleted successfully!",
            // //   alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          console.log(result.response.status === 400);
          let errMsg = "Unable to delete, some error occurred."
          if (result.response.status === 400) {
            errMsg = result.response.data.message
          }
          dispatch(globalAlertActions.globalAlert({alertMsg: errMsg, status: true}))

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
