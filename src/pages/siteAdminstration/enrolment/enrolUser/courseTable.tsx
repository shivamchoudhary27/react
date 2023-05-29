import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

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
  cleanFormValues
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

            <Link to={`/courseenrollment/${programId}/${row.original.id}/${row.original.coursename}`}>
              <Button>Enrol Users</Button>
              {/* <i className="fa-solid fa-pen" onClick={() => enrolToCourses(row.original.id)}></i> */}
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
      <div className="table-wrapper mt-3">
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
                    );
                  })}
                </tbody>
          </Table>
      </div>
    </>
  );
};

export default EnrolUserTable;
