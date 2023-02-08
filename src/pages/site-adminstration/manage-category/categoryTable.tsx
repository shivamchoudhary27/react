import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { CategoryRawData } from "./rawData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const tableColumn = [
  {
    Header: "",
    accessor: "icon",
    Cell: ({ row }: any) => <i className={row.values.icon}></i>,
  },
  {
    Header: "Categories",
    accessor: "categories",
  },
  {
    Header: "Add Sub category",
    accessor: "subCategory",
    Cell: ({ row }: any) => (
      <Link to="">
        <i className={row.values.subCategory}></i>
      </Link>
    ),
  },
  {
    Header: "Courses",
    accessor: "courses",
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }: any) => (
      <span>
        <Link to="">
          <i className={row.values.actions.edit}></i>
        </Link>{" "}
        <Link to="">
          <i className={row.values.actions.delete}></i>
        </Link>{" "}
        <Link to="">
          <i className={row.values.actions.hide}></i>
        </Link>
      </span>
    ),
  },
];

const CategoryTable = () => {
  const [selectedData, setSelectedData] = useState<any>(CategoryRawData);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => selectedData, [selectedData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleDragEnd = (results: any) => {
    if(!results.destination) return;
    let temp = [...selectedData];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setSelectedData(temp);
  };

  return (
    <>
      <div className="table-wrapper mt-3">
        <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
          <Table bordered hover {...getTableProps()}>
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
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...getTableBodyProps()}
                >
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        draggableId={`drag-id-${row.id.toString()}`}
                        index={index}
                        key={row.id.toString()}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => (
                              <td
                                {...provided.dragHandleProps}
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </div>
    </>
  );
};

export default CategoryTable;
