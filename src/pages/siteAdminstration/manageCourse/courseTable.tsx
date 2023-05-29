import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getLatestWeightForCategory } from "./utils";
import { deleteData as deleteCategoryData, putData, postData } from "../../../adapters/microservices";
import { getDragnDropAction, getItemsToUpdate, updateWeights } from './local';
import { useNavigate } from "react-router-dom";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const CourseTable = ({
  categoryData,
  toggleModalShow,
  programId,
  setFormParentValue, 
  setFormWeightValue,
  updatedeleterefresh,
  setEditCategoryValues,
  refreshcategories,
  cleanFormValues
}: any) => {
  const navigate = useNavigate();

  const tableColumn = [
    {
      Header: "",
      accessor: "icon",
      Cell: ({ row }: any) => 
        {row.original.courseid !== undefined 
         &&
         <i className="fa-solid fa-grip-lines"></i>
        },
      draggable: false,
    },
    {
      Header: "Categories",
      accessor: "name",
      Cell: ({ row }: any) => {
        return (
          <div
            style={{
              paddingLeft: setLevelPadding(row.original.level),
            }}
          >
            {row.values.name}
          </div>
        );
      },
      draggable: false,
    },
    {
      Header: "Courses",
      accessor: "coursename",
      draggable: true,
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {
            (row.original.coursename !== undefined) ?
            <>
              <Link to={`/courseform/${programId}/${row.original.catid}/${row.original.courseid}`}>
                <i className="fa-solid fa-pen"
                ></i>
              </Link>
              <Link to="">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => {
                    deleteHandler(row.original.courseid);
                  }}
                ></i>
              </Link>
              <Link to="">
                <i className="fa-solid fa-eye"></i>
              </Link>
            </>                        
            :
            (row.original.haschild !== undefined && row.original.haschild === false)
            &&
            <Button
              onClick={() => {addCourseHandler(row.original.id, row.original.name)}}
            >Add course</Button>
          }
        </span>
      ),
      draggable: false,
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
  const [updateSource, setUpdateSource] = useState<any>({data: {}, status : 'raw'});
  const [newWeightsItems, setNewWeightsItems] = useState<any>({data: {}, status : 'raw'});
  const [updatecourse, setUpdateCourse] = useState<any>({data: {coursedetail: '', category: 0}, status : 'nutral'});

  useEffect(() => {
    if (updatecourse.status === 'updating') {
      console.log(updatecourse);
      let updatingcourseid = updatecourse.data.coursedetail.id; 
      let updateCourseData = {
        name: updatecourse.data.coursedetail.name,
        courseCode: updatecourse.data.coursedetail.courseCode,
        description: updatecourse.data.coursedetail.description,
        published: updatecourse.data.coursedetail.published,
        category: { id : updatecourse.data.category}
      }
      const endPoint = `${programId}/course/${updatingcourseid}`;

      putData(endPoint, updateCourseData)
        .then((res : any) => {
          if (res.status === 200) {
            window.alert('Update successul');
            setUpdateCourse({data : {}, status : 'nutral'});
            refreshcategories();
          }
        })
        .catch((err : any) => {
          console.log(err);
          window.alert("Some error occurred!");
          setUpdateCourse({data : {}, status : 'nutral'});
        });
    }
  }, [updatecourse]);

  const addCourseHandler = (catID : number, catName: string) => {
    let path = `/courseform/${programId}/${catID}`;
    navigate(`/courseform/${programId}/${catID}/0`, {state: catName});
  }

  // category Table Elements Update handler === >>
  const editHandler = (courseid: number, catID: number) => {
    // console.log()
    navigate(`/courseform/${programId}/${catID}/${courseid}`);
  };

  // Drag & Drop handler method === >>
  const handleDragEnd = (results: any) => {
    if (!results.destination) return;

    // call to update the new position in data
    let catShifting = results.source.index;
    let toMoved = results.destination.index;

    if (categoryData[toMoved].haschild !== undefined && categoryData[toMoved].haschild === true) {
       window.alert('Course can be moved to only categories that have no children category after');
       return;
    }
    // if 
    let updateCourseCategory = categoryData[catShifting].coursedetails;

    setUpdateCourse({
      data: { 
        coursedetail: updateCourseCategory, 
        category: categoryData[toMoved].catid ?? categoryData[toMoved].id
      },
      status : 'updating'
    });

    let temp = [...selectedData];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setSelectedData(temp);
  };

  // category Table Elements Delete handler === >>
  const deleteHandler = (courseID: number) => {
    updatedeleterefresh(false);
    if (window.confirm('Are you sure to delete this course?')) {
      const endPoint = `${programId}/course/${courseID}`;
      deleteCategoryData(endPoint)
      .then((res: any) => {
        if (res.status === 200) {
          // console.log(res.data);
          updatedeleterefresh(true);
        } else if (res.status === 500) {
          window.alert('Unable to delete, this course might have come courses');
        } 
      }).catch((result : any) => {
        if (result.response.status === 500) {
          window.alert('Unable to delete, this course might have come courses');
        }            
      });
    }
  };

  // category Table Elements hide/show toggle handler === >>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  // handle to add new sub category === >>
  const addSubCategoryHandler = (id: number) => {
    cleanFormValues();
    let largestWeight = getLatestWeightForCategory(id, categoryData);
    setFormParentValue(id);
    setFormWeightValue(largestWeight);
    toggleModalShow(true);
  };

  const setLevelPadding = (level : number) => {
    let padding = ((level - 1) * 50) + "px";
      return padding;
  }

  return (
    <>
      <div className="table-wrapper mt-3">
        <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
          <Table borderless striped hover {...getTableProps()}>
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
              {(provided, snapshot) => (
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
                        draggableId={`drag-id-${row.original.id.toString()}`}
                        index={index}
                        key={row.id.toString()}
                        isDragDisabled={(row.original.courseid !== undefined)  ? false : true}
                      >
                        {(provided, snapshot) => (
                          // <tr
                          //   ref={provided.innerRef}
                          //   {...provided.draggableProps}
                          //   {...row.getRowProps()}
                          // >
                          <tr
                            {...row.getRowProps()}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: snapshot.isDragging ? 'papayawhip' : 'white',
                            }}
                          >
                            {row.cells.map((cell, index) => (
                              <td
                                {...provided.dragHandleProps}
                                {...cell.getCellProps()}
                                key={index}
                                style={{
                                  padding: '10px',
                                  border: 'solid 1px gray',
                                  background: 'white',
                                }}
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

export default CourseTable;
