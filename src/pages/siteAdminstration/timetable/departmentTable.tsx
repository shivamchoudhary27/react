import React, { useMemo } from "react";
import { deleteData as deleteDepartmentData } from "../../../adapters/microservices";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import { useDispatch } from "react-redux";
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
}: any) => {
  console.log(departmentData);
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Column 1",
      accessor: "name",
    },
    {
      Header: "Column 2",
      Cell: () => {
        <span>{2}</span>;
      },
    },
    {
      Header: "Column 3",
      Cell: ({ row }: any) => {
        <Link to="">
          <i
            className="fa-solid fa-pen"
            onClick={() =>
              console.log(`Navigate to setting page. Id - ${row.id}`)
            }
          ></i>
        </Link>;
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link className="action-icons" to="">
            <img
              src={editIcon}
              alt="Edit"
              onClick={() =>
                editHandler({ id: row.original.id, name: row.original.name })
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
          <Link className="action-icons" to="">
            <img
              src={showIcon}
              alt="Show"
              onClick={() => showToggleHandler(row.original.id)}
            />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => departmentData, [departmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ id, name }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name });
    refreshDepartmentData();
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    refreshOnDelete(false);
    if (window.confirm("Are you sure to delete this department?")) {
      let endPoint = `/departments/${id}`;
      deleteDepartmentData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
          } else if (res.status === 500) {
            dispatch({
              type: ACTIONSLIST.mitGlobalAlert,
              alertMsg: "Unable to delete, some error occurred",
              status: true,
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            dispatch({
              type: ACTIONSLIST.mitGlobalAlert,
              alertMsg: result.response.data.message,
              status: true,
            });
          } else {
            dispatch({
              type: ACTIONSLIST.mitGlobalAlert,
              alertMsg: result.response.data.message,
              status: true,
            });
          }
        });
    }
  };

  // hide show toggle event handler === >>>
  const showToggleHandler = (id: number) => {
    console.log(id);
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
    </>
  );
};

export default DepartmentTable;
