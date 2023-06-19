import React, { useMemo } from "react";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import { deleteData } from "../../../../adapters/microservices";
import Errordiv from "../../../../widgets/alert/errordiv";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";

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
  apiStatus
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
          <Link className="action-icons" to="">
            <img src={editIcon} alt="Edit" onClick={() =>
                editHandler({
                  id: row.original.id,
                  name: row.original.name,
                  description: row.original.description,
                })
              } />
          </Link>
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" onClick={() => deleteHandler(row.original.id)} />
          </Link>
          <Link className="action-icons" to="">
            <img src={showIcon} alt="Show" />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => manageGroupList, [manageGroupList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // update event handler
  const editHandler = ({id, name, description}: any) => {
    setModalShow(true);
    editHandlerById({id, name, description});
    refreshGroupData()
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    refreshOnDelete(false);
    if (window.confirm("Are you sure to delete this department?")) {
      let endPoint = `/${courseid}/group/${id}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
          } else if (res.status === 500) {
            window.alert("Unable to delete, some error occurred");
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            window.alert(result.response.data.message);
          } else {
            window.alert(result.response.data.message);
          }
        });
    }
  };

  return (
    <React.Fragment>
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
        {apiStatus === "started" && manageGroupList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && manageGroupList.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default ManageGroupTable;
