import React, { useMemo } from "react";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
// import { Data } from "./rawData";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import { deleteData } from "../../../../adapters/microservices";

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
  refreshGroupData
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
                })
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
      <div className="table-wrapper mt-3">
        <Table bordered hover {...getTableProps}>
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
        {manageGroupList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
      </div>
    </React.Fragment>
  );
};

export default ManageGroupTable;
