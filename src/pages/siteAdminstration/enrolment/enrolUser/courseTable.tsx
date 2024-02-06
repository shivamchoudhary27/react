import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import plusIcon from "../../../../assets/images/icons/plus-action.svg";
import gearIcon from "../../../../assets/images/icons/setting-action.svg";

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
  editHandlerById,
  setFormParentValue,
  setFormWeightValue,
  updatedeleterefresh,
  setEditCategoryValues,
  refreshcategories,
  cleanFormValues,
  apiStatus,
  name,
}: any) => {
  const navigate = useNavigate();

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
      Header: "Max Minor Course",
      accessor: "maxMinorCoursesAllowed",
      Cell: ({ row }: any) => {
        return (
          <div
            style={{
              paddingLeft: setLevelPadding(row.original.level),
            }}
          >
            {row.original.maxMinorCoursesAllowed}
          </div>
        );
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {row.original.level === 2 && (
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
                })
              }
            />
          )}
          {row.original.coursename !== undefined && (
            <span>
              {row.original !== undefined &&
              row.original.coursedetails.published !== false ? (
                <Link
                  className="action-icons small-icon"
                  to={`/courseenrollment/${programId}/${name}/${row.original.id}/${row.original.coursename}`}
                >
                  <img src={plusIcon} alt="Add Course" /> Enrol Users
                </Link>
              ) : (
                <span
                  className="action-icons small-icon"
                  style={{
                    backgroundColor: "#eeeeee",
                  }}
                >
                  {" "}
                  <img src={plusIcon} alt="Add Course" /> Enrol Users
                </span>
              )}
            </span>
          )}
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
  }: any) => {
    toggleModalShow(true);
    editHandlerById({
      id,
      name,
      level,
      weight,
      parent,
      maxMinorCoursesAllowed,
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
