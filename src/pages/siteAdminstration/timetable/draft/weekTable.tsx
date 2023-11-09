import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { addDays, format, startOfWeek } from "date-fns";
import React, { useEffect, useState, useMemo } from "react";

const WeeklyTimetable = ({ SlotData, apiStatus }: any) => {
  const columns = [
    {
      Header: "Time Slots",
      accessor: "timeSlot",
    },
    {
      Header: "Monday",
      accessor: "monday",
    },
    {
      Header: "Tuesday",
      accessor: "tuesday",
    },
    {
      Header: "Wednesday",
      accessor: "wednesday",
    },
    {
      Header: "Thursday",
      accessor: "thursday",
    },
    {
      Header: "Friday",
      accessor: "friday",
    },
    {
      Header: "Saturday",
      accessor: "saturday",
    },
    {
      Header: "Sunday",
      accessor: "sunday",
    },
  ];

  // Initialize the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      SlotData,
    });

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
        <Table borderless striped {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let cellBackgroundColor = "#f2f2f2"; // Default background color
                    let redColor = "rgb(255, 218, 216)";
                    let greenColor = "rgb(223, 237, 214)";
                    let cellContent = "";

                    if (cell.value) {
                      cellContent = cell.value;
                    }

                    if (cell.row.id === "0") {
                      if (
                        cell.column.id === "monday" ||
                        cell.column.id === "tuesday"
                      ) {
                        cellContent = "AJ-TUT-B651";
                      }
                      if (cell.column.id === "thursday") {
                        cellBackgroundColor = greenColor;
                      } else {
                        if (cell.value || cell.column.id === "sunday") {
                          cellBackgroundColor = "#e6f7ff";
                        } else if (cellContent === "") {
                          cellBackgroundColor = redColor;
                        }
                      }
                    }

                    if (cell.row.id === "1") {
                      if (cell.column.id === "wednesday") {
                        cellContent = "AJ-LAB-B111";
                      }
                      if (
                        cell.column.id === "monday" ||
                        cell.column.id === "saturday"
                      ) {
                        cellBackgroundColor = greenColor;
                      } else {
                        if (cell.value || cell.column.id === "sunday") {
                          cellBackgroundColor = "#e6f7ff";
                        } else if (cellContent === "") {
                          cellBackgroundColor = redColor;
                        }
                      }
                    }

                    if (cell.row.id === "2") {
                      if (
                        cell.column.id === "tuesday" ||
                        cell.column.id === "friday"
                      ) {
                        cellContent = "AJ-TUT-B115";
                      }
                      if (
                        cell.column.id === "thursday" ||
                        cell.column.id === "saturday"
                      ) {
                        cellBackgroundColor = greenColor;
                      } else {
                        if (cell.value || cell.column.id === "sunday") {
                          cellBackgroundColor = "#e6f7ff";
                        } else if (cellContent === "") {
                          cellBackgroundColor = redColor;
                        }
                      }
                    }

                    if (cell.row.id === "3") {
                      if (
                        cell.column.id === "monday" ||
                        cell.column.id === "tuesday"
                      ) {
                        cellContent = "AJ-TUT-B651";
                      }
                      if (cell.column.id === "thursday") {
                        cellBackgroundColor = greenColor;
                      } else {
                        if (cell.value || cell.column.id === "sunday") {
                          cellBackgroundColor = "#e6f7ff";
                        } else if (cellContent === "") {
                          cellBackgroundColor = redColor;
                        }
                      }
                    }

                    if (cell.row.id === "4") {
                      if (cell.column.id === "wednesday") {
                        cellContent = "AJ-LAB-B111";
                      }
                      if (
                        cell.column.id === "monday" ||
                        cell.column.id === "saturday"
                      ) {
                        cellBackgroundColor = greenColor;
                      } else {
                        if (cell.value || cell.column.id === "sunday") {
                          cellBackgroundColor = "#e6f7ff";
                        } else if (cellContent === "") {
                          cellBackgroundColor = redColor;
                        }
                      }
                    }

                    return (
                      <td
                        // {...cell.getCellProps()}
                        // style={{
                        //     borderBottom: "1px solid #ccc",
                        //     padding: "8px",
                        //     // textAlign: "center",
                        //     background: cell.value ? "#e6f7ff" : "#f2f2f2", // Adjust colors as needed
                        // }}

                        {...cell.getCellProps()}
                        style={{
                        //   textAlign: "center",
                          padding: "25px 15px",
                          background: cellBackgroundColor, // Use the defined color
                          borderBottom: "3px solid #f2f2f2", // Add a bottom border
                          borderRight: "3px solid #f2f2f2", // Add a right border
                        }}
                      >
                        {/* {cell.render("Cell")} */}
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default WeeklyTimetable;
