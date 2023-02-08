import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { CoursesRawData } from "./rawData";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const tableColumn = [
  {
    Header: "Categories",
    accessor: "categories",
  },
  {
    Header: "Courses",
    accessor: "courses",
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => (
      <span>
        <Link to="">
          <i className="fa-solid fa-pen"></i>
        </Link>{" "}
        <Link to="">
          <i className="fa-solid fa-trash"></i>
        </Link>{" "}
        <Link to="">
          <i className="fa-solid fa-eye"></i>
        </Link>
      </span>
    ),
  },
];

const CoursesTable = () => {
  const [selectedCourses, setSelectedCourses] = useState<any>(CoursesRawData);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => selectedCourses, [selectedCourses]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleDragEnd = (results: any) => {
    if (!results.destination) return;
    let temp = [...selectedCourses];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setSelectedCourses(temp);
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

export default CoursesTable;
