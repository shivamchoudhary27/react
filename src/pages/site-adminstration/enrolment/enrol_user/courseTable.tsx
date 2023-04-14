import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import { getLatestWeightForCategory } from "./utils";
import {
  deleteData as deleteCategoryData,
  putData,
  postData,
} from "../../../../adapters/microservices";
import { getDragnDropAction, getItemsToUpdate, updateWeights } from "./local";
import { useNavigate } from "react-router-dom";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const EnrolUserTable = ({
  categoryData,
  toggleModalShow,
  programId,
  setFormParentValue,
  setFormWeightValue,
  updatedeleterefresh,
  setEditCategoryValues,
  refreshcategories,
  cleanFormValues,
}: any) => {
  const navigate = useNavigate();

  const tableColumn = [
    // {
    //   Header: "",
    //   accessor: "icon",
    //   // Cell: ({ row }: any) => <i className="fa-solid fa-grip-lines"></i>,
    //   draggable: false,
    // },
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
      Cell: ({ row }: any) => {
        return (
          <div
            style={{
              paddingLeft: setLevelPadding(row.original.level),
            }}
          >
            {row.original.coursename !== undefined && (
              <>
                {/* <i className="fa fa-arrows mx-3"></i> */}
                {row.original.coursename}
              </>
            )}
          </div>
        );
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {row.original.coursename !== undefined && (
            <Button onClick={() => navigate("/enroluserscourse")}>
              Enrol Users
            </Button>
          )}
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
  const [updateSource, setUpdateSource] = useState<any>({
    data: {},
    status: "raw",
  });
  const [newWeightsItems, setNewWeightsItems] = useState<any>({
    data: {},
    status: "raw",
  });
  const [updatecourse, setUpdateCourse] = useState<any>({
    data: { coursedetail: "", category: 0 },
    status: "nutral",
  });

  useEffect(() => {
    if (updatecourse.status === "updating") {
      console.log(updatecourse);
      let updatingcourseid = updatecourse.data.coursedetail.id;
      let updateCourseData = {
        name: updatecourse.data.coursedetail.name,
        courseCode: updatecourse.data.coursedetail.courseCode,
        description: updatecourse.data.coursedetail.description,
        published: updatecourse.data.coursedetail.published,
        category: { id: updatecourse.data.category },
      };
      const endPoint = `${programId}/course/${updatingcourseid}`;

      putData(endPoint, updateCourseData)
        .then((res: any) => {
          if (res.status === 200) {
            window.alert("Update successul");
            setUpdateCourse({ data: {}, status: "nutral" });
            refreshcategories();
          }
        })
        .catch((err: any) => {
          console.log(err);
          window.alert("Some error occurred!");
          setUpdateCourse({ data: {}, status: "nutral" });
        });
    }
  }, [updatecourse]);

  const addCourseHandler = (catID: number, catName: string) => {
    let path = `/courseform/${programId}/${catID}`;
    navigate(`/courseform/${programId}/${catID}/0`, { state: catName });
  };

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

    if (
      categoryData[toMoved].haschild !== undefined &&
      categoryData[toMoved].haschild === true
    ) {
      window.alert(
        "Course can be moved to only categories that have no children category after"
      );
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
  const deleteHandler = (courseID: number) => {
    updatedeleterefresh(false);
    if (window.confirm("Are you sure to delete this course?")) {
      const endPoint = `${programId}/course/${courseID}`;
      deleteCategoryData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            // console.log(res.data);
            updatedeleterefresh(true);
          } else if (res.status === 500) {
            window.alert(
              "Unable to delete, this course might have come courses"
            );
          }
        })
        .catch((result: any) => {
          if (result.response.status === 500) {
            window.alert(
              "Unable to delete, this course might have come courses"
            );
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

  const setLevelPadding = (level: number) => {
    let padding = (level - 1) * 50 + "px";
    return padding;
  };

  return (
    <>
      <div className="table-wrapper mt-3">
        <Table bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th key={index}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr>
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "white",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
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

export default EnrolUserTable;
