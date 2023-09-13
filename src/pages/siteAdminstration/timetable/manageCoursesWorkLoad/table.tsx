import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import ACTIONSLIST from "../../../../store/actions";
import { getLatestWeightForCategory } from "./utils";
import Errordiv from "../../../../widgets/alert/errordiv";
import React, { useEffect, useMemo, useState } from "react";
import { putData } from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import plusIcon from "../../../../assets/images/icons/plus-action.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const CourseWorkLoadTable = ({
  programId,
  apiStatus,
  categoryData,
  toggleModalShow,
  cleanFormValues,
  editHandlerById,
  refreshcategories,
  toggleCourseModal,
  setFormParentValue,
  setFormWeightValue,
  updatedeleterefresh,
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
            <>{row.original.coursename}</>
          )}
        </>
      ),
      draggable: false,
    },
    {
      Header: "Theory (Load Per Week)",
      accessor: "theoryWorkload",
      draggable: false,
    },
    {
      Header: "Lab (Load Per Week)",
      accessor: "labWorkload",
      draggable: false,
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {row.original.coursename !== undefined && (
            <>
              {row.original.labWorkload !== null ? (
                <Link className="action-icons" to="">
                  <img
                    src={editIcon}
                    alt="Edit"
                    onClick={() =>
                      editHandler({
                        id: row.original.coursedetails.id,
                        name: row.original.coursename,
                        labWorkload: row.original.labWorkload,
                        theoryWorkload: row.original.theoryWorkload,
                      })
                    }
                  />
                </Link>
              ) : (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() =>
                    editHandler({
                      id: row.original.coursedetails.id,
                      name: row.original.coursename,
                      labWorkload: "",
                      theoryWorkload: "",
                    })
                  }
                >
                  <span className="action-icons small-icon">
                    <img src={plusIcon} alt="Add Course" /> Add
                  </span>
                </Button>
              )}
            </>
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");

  useEffect(() => {
    if (categoryData.length > 0) setSelectedData(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (updatecourse.status === "updating") {
      let updatingcourseid = updatecourse.data.coursedetail.id;
      let updateCourseData = {
        name: updatecourse.data.coursedetail.name,
        labWorkload: updatecourse.data.coursedetail.labWorkload,
        theoryWorkload: updatecourse.data.coursedetail.theoryWorkload,
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

  // category Table Elements Update handler === >>
  const editHandler = ({ id, name, labWorkload, theoryWorkload }: any) => {
    toggleCourseModal(true);
    editHandlerById({
      id: id,
      name: name,
      labWorkload: labWorkload,
      theoryWorkload: theoryWorkload,
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

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
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

export default CourseWorkLoadTable;
