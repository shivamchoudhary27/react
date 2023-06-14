import React, { useState, useMemo, useEffect } from "react";
import { deleteData as deleteProgramData } from "../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import DeleteAlert from "../../../widgets/alert/deleteAlert";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const ProgramTable = ({
  programTypeData,
  editHandlerById,
  toggleModalShow,
  refreshProgramData,
  refreshOnDelete,
  apiStatus,
  currentInstitute,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

  // custom react table Column === >>>
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
      accessor: "",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler({
                  id: row.original.id,
                  name: row.original.name,
                  description: row.original.description,
                  batchYearRequired: row.original.isBatchYearRequired,
                })
              }
            ></i>
          </Link>{" "}
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(row.original.id)}
            ></i>
          </Link>{" "}
          <Link to="">
            <i
              className="fa-solid fa-eye"
              // onClick={() => showToggleHandler(row.original.id)}
            ></i>
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => programTypeData, [programTypeData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ id, name, description, batchYearRequired }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name, description, batchYearRequired });
    refreshProgramData();
  };

  useEffect(() => {
    console.log(onDeleteAction)
    if (onDeleteAction === "Yes") {
      let endpoint = `/${currentInstitute}/program-types/${deleteId}`;
      deleteProgramData(endpoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
            setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully.",
              alertBoxColor: "success",
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
        refreshProgramData();
      }, 3000);
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
    console.log(action);
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="table-wrapper mt-3">
        <Table borderless striped hover {...getTableProps}>
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
        {apiStatus === "started" && programTypeData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && programTypeData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Program Type"
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

export default ProgramTable;