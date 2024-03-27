import React, { useEffect, useMemo, useState } from "react";
import { Table, Button, OverlayTrigger,Tooltip as BsTooltip } from "react-bootstrap";
import { useTable } from "react-table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import plusIcon from "../../../../assets/images/icons/plus-action.svg";
import gearIcon from "../../../../assets/images/icons/setting-action.svg";
import { Tooltip } from "react-tooltip";
import { MdHelpOutline } from "react-icons/md";
import "./style.scss";

const EnrolUserTable = ({
  categoryData,
  toggleModalShow,
  programId,
  editHandlerById,
  setFormParentValue,
  setFormWeightValue,
  updatedeleterefresh,
  setEditCategoryValues,
  refreshcategories,
  cleanFormValues,
  apiStatus,
  currentUserRole,
  name,
}: any) => {
  const navigate = useNavigate();
  const tableColumn = [
    {
      Header: "Categories",
      accessor: "name",
      Cell: ({ row }: any) => {
        return (
          <>
          <div
            style={{
              paddingLeft: setLevelPadding(row.original.level),
            }}
          >
            {row.values.name}
          </div>
          {row.original.maxMinorCoursesAllowed ? (
  <div
  className="enrolmentrequired-tag"
  >
 {` Enrollment required ${row.original.maxMinorCoursesAllowed} course${row.original.maxMinorCoursesAllowed > 1 ? "s" : ""} `}
  </div>
) : null}
          </>
        );
      },
    },
    {
      Header: "Courses",
      accessor: "coursename",
      Cell: ({ row }: any) => {
        return (
          <div
            style={{
              paddingLeft: setLevelPadding(row.original.level),
            }}
          >
            {row.original.coursename !== undefined && (
              <>{row.original.coursename}</>
            )}
          </div>
        );
      },
    },
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

      Header: "Seating capacity",
      accessor: "enrollmentCapacity",
      Cell: ({ row }: any) => (
        <>
        {row.original.coursedetails &&
          row.original.coursedetails.enrollmentCapacity &&
           (
            <>
              {row.original.coursedetails.enrollmentCapacity }
            </>
          )}
      </>
      ),
    },

    {
      Header: "Actions",
      Cell: ({ row }: any) => {
        const data = row.original.courses.find((course: any) => {
          return course.courseType === "minor";
        });
        return (
          <div className="enrollment-actions">
            {row.original.courses.length  > 0  &&
            data !== undefined  &&
             (
              <>
              <img
                style={{ cursor: "pointer" }}
                src={gearIcon}
                alt="Setting"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    name: row.original.name,
                    level: row.original.level,
                    weight: row.original.weight,
                    parent: row.original.parent,
                    maxMinorCoursesAllowed: row.original.maxMinorCoursesAllowed,
                    enrolBeforeNoOfDaysToStartDate: row.original.enrolBeforeNoOfDaysToStartDate,
                    UnEnrollmentAfterDate: row.original.unEnrolafterNoOfDaysToStartDate,
                  })
                }
              />
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip id="button-tooltip-2">Set Max Minor Courses Allowed and User Unenrollment Deadline</BsTooltip>}
                >
              <Button variant="link">
              <MdHelpOutline fontSize={30} />
              </Button>
                </OverlayTrigger>
                </>
            )}
            {row.original.coursename !== undefined && (
              // <div className="d-flex justify-content-center align-items-center gap-2">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <Link
                  className={`action-icons small-icon ${
                    row.original !== undefined &&
                    row.original.coursedetails.published !== false
                      ? ""
                      : "disabled my-anchor-element"
                  }`}
                  to={`${
                    row.original !== undefined &&
                    row.original.coursedetails.published !== false
                      ? `/courseenrollment/${programId}/${name}/${row.original.id}/${row.original.coursename}`
                      : "#"
                  }`}
                
                >
                  <img src={plusIcon} alt="Add Course" /> Enrol Users
                </Link>
                {row.original.coursedetails.courseType === "minor" &&
                  // currentUserRole.shortName === "editingteacher" &&
                   (
                    <Link
                      className={`action-icons small-icon ${
                        row.original !== undefined &&
                        row.original.coursedetails.published !== false
                          ? ""
                          : "disabled my-anchor-element"
                      }`}
                      to={`${
                        row.original !== undefined &&
                        row.original.coursedetails.courseType === "minor" 
                        ? `/userwaitlist/${programId}/${name}/${row.original.courseid}`
                        : "#"
                      }`}
                    >
                      View Waitlist
                    </Link>
                  )}

                {/* // {row.original.coursedetails.courseType === "minor" && 
                //   <Button onClick={()=>navigate("/userwaitlist")}>View Waitlist</Button>
                //  } */}

                <Tooltip
                  anchorSelect=".my-anchor-element"
                  style={{ backgroundColor: "#F0EDD4", color: "#222" }}
                  content="course disabled"
                  place="left"
                />
              </div>
            )}
          </div>
        );
      },
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

  const enrolToCourses = (courseid: number) => {};

  const setLevelPadding = (level: number) => {
    let padding = (level - 1) * 50 + "px";
    return padding;
  };

  // category Table Elements Update handler === >>
  const editHandler = ({
    id,
    name,
    level,
    weight,
    parent,
    maxMinorCoursesAllowed,
    enrolBeforeNoOfDaysToStartDate,
    UnEnrollmentAfterDate,
  }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      name,
      level,
      weight,
      parent,
      maxMinorCoursesAllowed,
      enrolBeforeNoOfDaysToStartDate,
      UnEnrollmentAfterDate,
    });
  };

  return (
    <>
      <div className="table-responsive admin-table-wrapper mt-3">
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

          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
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
        {/* {apiStatus === "started" && selectedData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && selectedData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )} */}
      </div>
    </>
  );
};

export default EnrolUserTable;
