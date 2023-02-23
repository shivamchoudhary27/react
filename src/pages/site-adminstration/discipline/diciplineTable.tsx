import React, { useMemo } from "react";
import { deleteData as deleteDisciplineData } from "../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const DiciplineTable = ({
  diciplineData,
  editHandlerById,
  toggleModalShow,
  refreshDisciplineData,
}: any) => {
  // custom react table column === >>>
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
            <i
              className="fa-solid fa-eye"
              onClick={() => showToggleHandler(row.original.id)}
            ></i>
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => diciplineData, [diciplineData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ id, name, description }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name, description });
    refreshDisciplineData(false);
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    const confirmBox = confirm("You want to delete");
    if (confirmBox === true) {
      let endpoint = `/disciplines/${id}`;
      refreshDisciplineData(false);
      deleteDisciplineData(endpoint).then((res) => {
        if (res.data !== "" && res.status === 200) {
          refreshDisciplineData(true);
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
      <div className="table-wrapper mt-3" style={{ paddingLeft: "270px" }}>
        <Table bordered hover {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DiciplineTable;
