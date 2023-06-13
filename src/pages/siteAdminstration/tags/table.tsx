import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import { deleteData as deleteTagData } from "../../../adapters/microservices";
import Errordiv from "../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import DeleteAlert from "../../../widgets/alert/deleteAlert";

const rawData = [
  {
    name: "mobile",
  },
  {
    name: "trending",
  },
  {
    name: "courses",
  },
];

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const TagsTable = ({
  allTags,
  toggleModalShow,
  updateDeleteRefresh,
  editHandlerById,
  apiStatus,
  currentInstitute,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

  const tableColumn = [
    {
      Header: "#Tags Name",
      accessor: "name",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler({ id: row.original.id, name: row.original.name })
              }
            ></i>
          </Link>
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(row.original.id)}
            ></i>
          </Link>
          <Link to="">
            <i className="fa-solid fa-eye"></i>
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => allTags, [allTags]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const editHandler = ({ id, name }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint = `${currentInstitute}/tags/${deleteId}`;
      deleteTagData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            updateDeleteRefresh(true);
            setShowAlert(true);
            setAlertMsg({
              message:
                "Deleted successfully",
              alertBoxColor: "success",
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
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </>
  );
};

export default TagsTable;
