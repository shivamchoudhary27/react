import React, { useMemo, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { putData, deleteData as deleteDepartmentData } from "../../../adapters/microservices";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import programIcon from "../../../assets/images/icons/manage-program-action.svg";
import ACTIONSLIST from "../../../store/actions";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const DepartmentTable = ({
  departmentData,
  editHandlerById,
  toggleModalShow,
  refreshDepartmentData,
  refreshOnDelete,
  apiStatus,
  currentInstitute,
}: any) => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Department",
      accessor: "name",
    },
    {
      Header: "Program Attached",
      accessor: "totalPrograms"
    },
    {
      Header: "Manage Programs",
      Cell: ({ row }: any) => (
        <Link className="action-icons" to="" onClick={() => manageDepartmentPrograms(row.original.id)}>
          <img src={programIcon} alt="Manage Program" />
        </Link>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link className="action-icons" to="">
            <img src={editIcon} alt="Edit" onClick={() =>
                editHandler({ id: row.original.id, name: row.original.name, published: row.original.published })
              } />
          </Link>
          <Link className={`action-icons ${row.original.totalPrograms > 0 ? '' : 'delete-disabled'}`} to="">
            <img 
              src={deleteIcon} alt="Delete" 
              onClick={() => row.original.totalPrograms < 1 ? deleteHandler(row.original.id) : null} 
            />
          </Link>{" "}
          <Link className="action-icons" to="" onClick={() => {
            toggleDepartmentPublished(row.original)
          }}
          >
            <img src={row.original.published !== false ? showIcon : hideIcon} alt="Show" />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => departmentData, [departmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [forceRender, setForceRender] = useState(false);

  // edit event handler === >>>
  const editHandler = ({ id, name, published }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name, published });
    refreshDepartmentData();
  };

  const toggleDepartmentPublished = (departmentPacket: any) => { 
    departmentPacket.published = !departmentPacket.published;
    setForceRender(prevState => !prevState);
    let endPoint = `/${currentInstitute}/departments/${departmentPacket.id}`;
    putData(endPoint, departmentPacket)
      .then((res: any) => {
        setForceRender(prevState => !prevState);
      })
      .catch((err: any) => {
        window.alert('Action failed due to some error');
        departmentPacket.published = !departmentPacket.published
        setForceRender(prevState => !prevState);
      });
  }

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `${currentInstitute}/departments/${deleteId}`;
      deleteDepartmentData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            console.log(deleteId + ": deleted------");
            refreshOnDelete(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully!",
              alertBoxColor: "success",
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
          console.log(result);
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
    dispatch({type: ACTIONSLIST.currentDepartmentFilterId, departmentId: id});
    setTimeout(() => {navigate('/manageprogram')}, 400)
  }

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    refreshOnDelete(false);
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
    <>
      <div className="table-responsive table-wrapper mt-3">
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
        {apiStatus === "started" && departmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && departmentData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Department"
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

export default DepartmentTable;
