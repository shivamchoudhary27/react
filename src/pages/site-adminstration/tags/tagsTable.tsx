import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import { deleteData as deleteTagData } from "../../../adapters/microservices";

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
}: any) => {
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

  const editHandler = ({id,name}: any) => {
    toggleModalShow(true);
    editHandlerById({id, name});
  };

  const deleteHandler = (id: number) => {
    updateDeleteRefresh(false);
    let endPoint = `/tags/${id}`;
    deleteTagData(endPoint)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          updateDeleteRefresh(true);
        } else if (res.status === 500) {
          window.alert(
            "Unable to delete, this tag might have been used in some programs"
          );
        }
      })
      .catch((result: any) => {
        if (result.response.status === 500) {
          window.alert(
            "Unable to delete, this tag might have been used in some programs"
          );
        }
      });
  };

  return (
    <>
      <div className="table-wrapper mt-5">
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
        {allTags.length === 0 && (
          <TableSkeleton numberOfRows={4} numberOfColumns={4} />
        )}
      </div>
    </>
  );
};

export default TagsTable;
