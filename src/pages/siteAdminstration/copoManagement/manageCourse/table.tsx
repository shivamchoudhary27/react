import { useEffect, useMemo, useState } from "react";
import { Table, } from "react-bootstrap";
import { useTable } from "react-table";
import { Link, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getLatestWeightForCategory } from "./utils";
import {
  deleteData as deleteCategoryData,
  putData,
} from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
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
  refreshcategories,
  cleanFormValues,
  toggleCourseModal,
  editHandlerById,
  apiStatus,
}: any) => {
  const {id, name} = useParams()
  
  const tableColumn = [
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
            {row.original.name &&
              `${row.original.name
                .charAt(0)
                .toUpperCase()}${row.original.name.slice(1)}`}
          </div>
        );
      },
      draggable: false,
    },
    {
      Header: "Courses",
      accessor: "coursename"},
    {
      Header: "Course Type",
      Cell: ({ row }: any) => (
        <>
          {row.original.coursedetails &&
            row.original.coursedetails.courseType &&
            typeof row.original.coursedetails.courseType === "string" && (
              <>
                {row.original.coursedetails.courseType.charAt(0).toUpperCase() +
                  row.original.coursedetails.courseType.slice(1).toLowerCase()}
              </>
            )}
        </>
      ),
      draggable: true,
    },
   
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {row.original.coursename !== undefined && (
            <>
                <Link
                  className="action-icons"
                  to={`/tabsList/${id}/${name}/${row.original.courseid}/${row.original.coursename}`}
                >Configuration
                </Link>
                {/* <Link
                  className="action-icons"
                  to=""
                  // to={`/courseform/${programId}/${row.original.catid}/${row.original.courseid}`}
                >Reset
                </Link> */}
                </>

              )}
              </span>
            )
    },
  ];
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState<any>(categoryData);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => selectedData, [selectedData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [updatecourse, setUpdateCourse] = useState<any>({
    data: { coursedetail: "", category: 0 },
    status: "nutral",
  });
  const [forceRender, setForceRender] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    if (categoryData.length > 0) setSelectedData(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (updatecourse.status === "updating") {
      let updatingcourseid = updatecourse.data.coursedetail.id;
      let updateCourseData = {
        name: updatecourse.data.coursedetail.name,
        courseCode: updatecourse.data.coursedetail.courseCode,
        description: updatecourse.data.coursedetail.description,
        published: updatecourse.data.coursedetail.published,
        category: { id: updatecourse.data.category },
        startDate: updatecourse.data.coursedetail.startDate,
        endDate: updatecourse.data.coursedetail.endDate,
        type: updatecourse.data.coursedetail.courseType,
        enrollmentCapacity: updatecourse.data.coursedetails.enrollmentCapacity,
      };
      const endPoint = `${programId}/course/${updatingcourseid}`;

      putData(endPoint, updateCourseData)
        .then((res: any) => {
          if (res.status === 200) {
            setUpdateCourse({ data: {}, status: "nutral" });
            refreshcategories();
          }
        })
        .catch((err: any) => {
          console.log(err);
          dispatch({
            type: ACTIONSLIST.mitGlobalAlert,
            alertMsg: "Some error occurred!",
            status: true,
          });
          setUpdateCourse({ data: {}, status: "nutral" });
        });
    }
  }, [updatecourse]);

  const toggleCoursePublished = (coursePacket: any) => {
    coursePacket.coursedetails.published =
      !coursePacket.coursedetails.published;
    coursePacket.coursedetails.category = { id: coursePacket.catid };

    setForceRender((prevState) => !prevState);

    let endPoint = `${programId}/course/${coursePacket.courseid}`;
    putData(endPoint, coursePacket.coursedetails)
      .then((res: any) => {
        console.log(res)
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        if (err.response.status === 500) {
          console.log(err)
          setShowAlert(true);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "danger",
          });
        }
        dispatch({
          type: ACTIONSLIST.mitGlobalAlert,
          alertMsg: "Action failed due to some error",
          status: true,
        });
        coursePacket.coursedetails.published =
          !coursePacket.coursedetails.published;
        setForceRender((prevState) => !prevState);
      });
  };

  // category Table Elements Update handler === >>
  const editHandler = ({
    id,
    name,
    courseCode,
    category,
    description,
    published,
    files,
    startDate,
    endDate,
    type,
    enrollmentCapacity,
  }: any) => {
    // navigate(`/courseform/${programId}/${catID}/${courseid}`);
    toggleCourseModal(true);
    editHandlerById({
      id,
      name,
      courseCode,
      category,
      description,
      published,
      files,
      startDate,
      endDate,
      type,
      enrollmentCapacity,
    });
  };

  // Drag & Drop handler method === >>
  const handleDragEnd = (results: any) => {
    if (!results.destination) return;

    // call to update the new position in data
    let catShifting = results.source.index;
    let toMoved = results.destination.index;

    if (
      categoryData[toMoved].haschild !== undefined &&
      categoryData[toMoved].haschild === true
    ) {
      dispatch({
        type: ACTIONSLIST.mitGlobalAlert,
        alertMsg:
          "Course can be moved to only categories that have no children category after",
        status: true,
      });
      return;
    }
    // if
    let updateCourseCategory = categoryData[catShifting].coursedetails;

    setUpdateCourse({
      data: {
        coursedetail: updateCourseCategory,
        category: categoryData[toMoved].catid ?? categoryData[toMoved].id,
      },
      status: "updating",
    });

    let temp = [...selectedData];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setSelectedData(temp);
  };

  // category Table Elements Delete handler === >>
  useEffect(() => {
    updatedeleterefresh(false);
    if (onDeleteAction === "Yes") {
      const endPoint = `${programId}/course/${deleteId}`;
      deleteCategoryData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            updatedeleterefresh(true);
            setShowAlert(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Courses has been successfully deleted",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 500 || 400 || 404) {
            setShowAlert(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "error",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Unable to delete, this course might have attached entity",
            });
            
          }
          
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  // delete event handler === >>>
  const deleteHandler = (courseID: number) => {
    updatedeleterefresh(false);
    setShowDeleteModal(true);
    setDeleteId(courseID);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };


  // handle to add new sub category === >>
  const addSubCategoryHandler = (id: number) => {
    cleanFormValues();
    let largestWeight = getLatestWeightForCategory(id, categoryData);
    setFormParentValue(id);
    setFormWeightValue(largestWeight);
    toggleModalShow(true);
  };

  const setLevelPadding = (level: number) => {
    let padding = (level - 1) * 50 + "px";
    return padding;
  };

  return (
    <>
      <div className="table-responsive admin-table-wrapper mt-3">
        {/* <DragDropContext onDragEnd={(results) => handleDragEnd(results)}> */}
          <Table borderless striped {...getTableProps()}>
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
            {/* <Droppable droppableId="tbody">
              {(provided, snapshot) => ( */}
                <tbody
                  // ref={provided.innerRef}
                  // {...provided.droppableProps}
                  {...getTableBodyProps()}
                >
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      // <Draggable
                      //   draggableId={`drag-id-${row.id.toString()}`}
                      //   index={index}
                      //   key={row.id.toString()}
                      //   isDragDisabled={
                      //     row.original.courseid !== undefined ? false : true
                      //   }
                      // >
                        // {(provided, snapshot) => (
                          <tr
                            {...row.getRowProps()}
                            // ref={provided.innerRef}
                            // {...provided.draggableProps}
                            // style={{
                            //   ...provided.draggableProps.style,
                            //   backgroundColor: snapshot.isDragging
                            //     ? "papayawhip"
                            //     : "white",
                            // }}
                          >
                            {row.cells.map((cell, index) => (
                              <td
                                // {...provided.dragHandleProps}
                                {...cell.getCellProps()}
                                key={index}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        // )}
                      // </Draggable>
                    )
                  })}
                  {/* {provided.placeholder} */}
                </tbody>
              {/* )}
            </Droppable> */}
          </Table>
        {/* </DragDropContext> */}
        {apiStatus === "started" && selectedData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && selectedData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Course"
      />
    </>
  );
};

export default CourseTable;
