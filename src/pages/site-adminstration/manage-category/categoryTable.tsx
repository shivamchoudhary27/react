import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CategoryModal from "./categoryModal";
import { getLatestWeightForCategory } from "./utils";
import { deleteData as deleteCategoryData } from "../../../adapters/microservices";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const CategoryTable = ({
  categoryData,
  modalShow,
  toggleModalShow,
  id,
}: any) => {
  const [subCategoryParentId, setSubCategoryParentId] = useState<number>(0);
  const [subCategoryWeight, setSubCategoryWeight] = useState<number>(0);

  // console.log(categoryData);
  const tableColumn = [
    {
      Header: "",
      accessor: "icon",
      Cell: ({ row }: any) => <i className="fa-solid fa-grip-lines"></i>,
    },
    {
      Header: "Categories",
      accessor: "name",
      Cell: ({ row }: any) => {
        return (
          <div
            style={{
              paddingLeft: row.original.parent === 0 ? "0px" : "30px",
            }}
          >
            {row.values.name}
          </div>
        );
      },
    },
    {
      Header: "Add Sub category",
      accessor: "subCategory",
      Cell: ({ row }: any) => (
        <>
          <Link to="" onClick={() => addSubCategoryHandler(row.original.id)}>
            <i className="fa-solid fa-square-plus"></i>
          </Link>
        </>
      ),
    },
    {
      Header: "Courses",
      accessor: "courses",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i className="fa-solid fa-pen"></i>
          </Link>
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => {
                deleteHandler(row.original.id);
              }}
            ></i>
          </Link>
          <Link to="">
            <i className="fa-solid fa-eye"></i>
          </Link>
        </span>
      ),
    },
  ];

  const [selectedData, setSelectedData] = useState<any>(categoryData);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => selectedData, [selectedData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Drag & Drop handler method === >>
  const handleDragEnd = (results: any) => {
    console.log(results);
    if (!results.destination) return;
    let temp = [...selectedData];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setSelectedData(temp);
  };

  // category Table Elements Update handler === >>
  const editHandler = (id: number) => {
    console.log(id);
  };

  // category Table Elements Delete handler === >>
  const deleteHandler = (delID: number) => {
    const endPoint = `${id}/category/${delID}`;
    deleteCategoryData(endPoint)
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // category Table Elements hide/show toggle handler === >>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  // handle to add new sub category === >>
  const addSubCategoryHandler = (id: number) => {
    console.log("hello clicked ", id);
    setSubCategoryParentId(id);
    addSubCatWeight(id);
    toggleModalShow(true);
  };

  // handle to count weight for sub category === >>
  const addSubCatWeight = (id: number) => {
    let largestWeight = getLatestWeightForCategory(id, categoryData);
    console.log("largestWeight", largestWeight);
    setSubCategoryWeight(largestWeight);
  };

  return (
    <>
      <div className="table-wrapper mt-3">
        <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
          <Table bordered hover {...getTableProps()}>
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
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...getTableBodyProps()}
                >
                  {rows.map((row, index) => {
                    // console.log(row);
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
                            {row.cells.map((cell, index) => (
                              <td
                                {...provided.dragHandleProps}
                                {...cell.getCellProps()}
                                key={index}
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
        <CategoryModal
          show={modalShow}
          onHide={() => toggleModalShow(false)}
          toggleModalShow={toggleModalShow}
          weight={subCategoryWeight}
          parent={subCategoryParentId}
        />
      </div>
    </>
  );
};

export default CategoryTable;
