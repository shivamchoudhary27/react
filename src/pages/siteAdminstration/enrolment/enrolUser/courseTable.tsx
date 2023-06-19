import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import plusIcon from "../../../../assets/images/icons/plus-action.svg";

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
  apiStatus,
  name
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
            { 
             row.original.coursename !== undefined
             &&
             <>
              {row.original.coursename}
             </>
            }
          </div>
        );
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {
            (row.original.coursename !== undefined) &&
            <Link className="action-icons small-icon" to={`/courseenrollment/${programId}/${name}/${row.original.id}/${row.original.coursename}`}>
                <img src={plusIcon} alt="Add Course" /> Enrol Users            
            </Link>
          }
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

  const enrolToCourses = (courseid : number) => {
    console.log(courseid);
  }

  const setLevelPadding = (level : number) => {
    let padding = ((level - 1) * 50) + "px";
      return padding;
  }

  return (
    <>
      <div className="table-responsive table-wrapper mt-3">
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

                <tbody
                  {...getTableBodyProps()}
                >
                  {rows.map((row, index) => {
                    // console.log(row);
                    prepareRow(row);
                    return (
                          // <tr
                          //   ref={provided.innerRef}
                          //   {...provided.draggableProps}
                          //   {...row.getRowProps()}
                          // >
                          <tr
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell, index) => (
                              <td
                                {...cell.getCellProps()}
                                key={index}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                    );
                  })}
                </tbody>
          </Table>
          {apiStatus === "started" && categoryData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && categoryData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </>
  );
};

export default EnrolUserTable;
