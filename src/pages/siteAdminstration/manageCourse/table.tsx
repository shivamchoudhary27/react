import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getLatestWeightForCategory } from "./utils";
import {
  deleteData as deleteCategoryData,
  putData,
  postData,
} from "../../../adapters/microservices";
import { getDragnDropAction, getItemsToUpdate, updateWeights } from "./local";
import { useNavigate } from "react-router-dom";
import moveIcon from "../../../assets/images/icons/move-action.svg";
import plusIcon from "../../../assets/images/icons/plus-action.svg";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../store/actions";

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
  cleanFormValues,
  toggleCourseModal,
  openAddCourseModal,
  editHandlerById,
  getDeleteCourseID,
  apiStatus,
  coursePermission
}: any) => {
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
            {row.values.name}
          </div>
        );
      },
      draggable: false,
    },
    {
      Header: "Courses",
      // accessor: "coursename",
      Cell: ({ row }: any) => (
        <>
          {row.original.coursename !== undefined && (
            <>
              <img src={moveIcon} className="me-3" alt="Move course" />
              {row.original.coursename}
              {row.original.files.length > 0 && 
                <img src={row.original.files[0].url} alt="course image" height="25px" />
              }
            </>
          )}
        </>
      ),
      draggable: true,
    },
    { 
      Header: "Course Type",
      Cell: ({ row }: any) => (
        <>
          {row.original.coursedetails !== undefined && (
            <>
            {row.original.coursedetails.courseType}
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
          {row.original.coursename !== undefined ? (
            <>
              {coursePermission.canEdit &&
                <Link
                className="action-icons"
                  to=""
                  // to={`/courseform/${programId}/${row.original.catid}/${row.original.courseid}`}
                >
                  <img
                    src={editIcon}
                    alt="Edit"
                    onClick={() =>
                      editHandler({
                        id: row.original.coursedetails.id,
                        name: row.original.coursename,
                        courseCode: row.original.coursedetails.courseCode,
                        category: row.original.catid,
                        description: row.original.coursedetails.description,
                        published: row.original.coursedetails.published,
                        files: row.original.coursedetails.files,
                        startDate: row.original.coursedetails.startDate,
                        endDate: row.original.coursedetails.endDate,
                        courseType: row.original.coursedetails.courseType
                      })
                    }
                    />
                </Link>
              }
              {coursePermission.canDelete &&
                <Link className="action-icons" to="">
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    onClick={() => {
                      deleteHandler(row.original.courseid);
                    }}
                    />
                </Link>
              }
              {coursePermission.canEdit &&
                <Link
                  className="action-icons"
                  to=""
                  onClick={() => {
                    toggleCoursePublished(row.original);
                  }}
                >
                  <img
                    src={row.original.coursedetails.published !== false ? showIcon : hideIcon}
                    alt="Show"
                    />
                </Link>
              }
            </>
          ) : (
            coursePermission.canEdit &&
            row.original.haschild !== undefined &&
            row.original.haschild === false && (
              <Button
                variant="link"
                size="sm"
                onClick={() =>
                  editHandler({
                    id: 0,
                    name: "",
                    courseCode: "",
                    category: row.original.id,
                    description: "",
                    published: false,
                    startDate: null,
                    endDate: null,
                    courseType: null,
                  })
                }
              >
                <span className="action-icons small-icon">
                  <img src={plusIcon} alt="Add Course" /> Add Course
                </span>
              </Button>
            )
          )}
        </span>
      ),
      draggable: false,
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
        courseType: updatecourse.data.coursedetail.courseType
      };
      const endPoint = `${programId}/course/${updatingcourseid}`;

      putData(endPoint, updateCourseData)
        .then((res: any) => {
          if (res.status === 200) {
            console.log(res.status)
            setUpdateCourse({ data: {}, status: "nutral" });
            refreshcategories();
          }
        })
        .catch((err: any) => {
          console.log(err);
          dispatch({
            type: ACTIONSLIST.mitGlobalAlert,
            alertMsg:
              "Some error occurred!",
            status: true,
          });
          setUpdateCourse({ data: {}, status: "nutral" });
        });
    }
  }, [updatecourse]);

  const toggleCoursePublished = (coursePacket: any) => {

    coursePacket.coursedetails.published = !coursePacket.coursedetails.published;
    coursePacket.coursedetails.category = { id: coursePacket.catid}

    setForceRender((prevState) => !prevState);

    let endPoint = `${programId}/course/${coursePacket.courseid}`;
    putData(endPoint, coursePacket.coursedetails)
      .then((res: any) => {
        console.log(res)
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        dispatch({
          type: ACTIONSLIST.mitGlobalAlert,
          alertMsg:
            "Action failed due to some error",
          status: true,
        });
        coursePacket.coursedetails.published = !coursePacket.coursedetails.published
        setForceRender(prevState => !prevState);
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
    courseType
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
      courseType
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
            setAlertMsg({
              message: "deleted successfully",
              alertBoxColor: "success",
            });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete, this course might have come courses",
              alertBoxColor: "danger",
            });
          }
          if (result.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete",
              alertBoxColor: "danger",
            });
          }
          if (result.response.status === 404) {
            setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete",
              alertBoxColor: "danger",
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

  // category Table Elements hide/show toggle handler === >>
  const showToggleHandler = (id: number) => {
    // console.log(id);
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
      <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
      <div className="table-responsive admin-table-wrapper mt-3">
        <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
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
            <Droppable droppableId="tbody">
              {(provided, snapshot) => (
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
                        isDragDisabled={
                          row.original.courseid !== undefined ? false : true
                        }
                      >
                        {(provided, snapshot) => (
                          <tr
                            {...row.getRowProps()}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: snapshot.isDragging
                                ? "papayawhip"
                                : "white",
                            }}
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
