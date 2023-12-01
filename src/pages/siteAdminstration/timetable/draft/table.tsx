import "./style.scss";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { tableColumnTemplate } from "./utils";
import { addDays, format, startOfWeek } from "date-fns";
import React, { useMemo, useState, useEffect } from "react";

const DraftVersionTable = ({ SlotData, apiStatus, courseDates }: any) => {
  const currentDate = new Date();
  const [headername, setHeadername] = useState(0);
  const [tableColumn, setTableColumn] = useState(tableColumnTemplate);
  const columns = useMemo(() => tableColumn, [tableColumn]);
  const data = useMemo(() => SlotData, [SlotData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [selectedStartDate, setSelectedStatrtDate] = useState(new Date());
  const [BtnVisibility, setBtnVisibility] = useState(false);

  useEffect(() => {
    const startDateString = courseDates.startDate;
    const endDateString = courseDates.endDate;
    const startParts = startDateString.split("/"); 
    const endParts = endDateString.split("/"); 
    const fullDate = new Date(startParts[2], startParts[0] - 1, startParts[1]);
    const x = new Date(endParts[2], endParts[0] - 1, endParts[1]);
    // console.log("x------", x);
    if (!isNaN(fullDate.getTime())) {
      setSelectedStatrtDate(fullDate);
    } else {
      setSelectedStatrtDate(currentDate);
    }
  }, [courseDates]);

  useEffect(() => {
    const nextMonday = addDays(
      startOfWeek(selectedStartDate, { weekStartsOn: 1 }),
      headername
    ); // 1 corresponds to Monday, add 7 days for the next week
    const startOfCurrentWeek = startOfWeek(nextMonday, { weekStartsOn: 1 });
    const weekDates = [...Array(7).keys()].map((offset) =>
      addDays(startOfCurrentWeek, offset)
    );

    // console.log("headername-------", headername);

    const newWeekColumns = [
      {
        Header: "Time Slots",
        accessor: "timeSlot",
      },
      ...weekDates.map((date, index) => ({
        Header: (
          <>
            <div>{`${format(date, "d")}`} </div>
            <div>{`${format(date, "EEEE")}`}</div>
          </>
        ),
        accessor: format(date, "EEEE").toLowerCase(), // Use a dynamic accessor for each day
        Cell: ({ row }: any) => {
          let currentColumns = JSON.parse(
            row.original[format(date, "EEEE").toLowerCase()]
          );
          return (
            <div>
              {currentColumns.status === "booked" &&
                currentColumns.bookedDetais}
              {currentColumns.status === "available" && "Available"}
              {currentColumns.status === "weekend" && "Weekend"}
            </div>
          );
        },
      })),
    ];
    setTableColumn(newWeekColumns);
  }, [headername, selectedStartDate]);

  const handleNextWeek = () => {
    setHeadername((prevCount) => prevCount + 7);
  };

  const handlePreviousWeek = () => {
    setHeadername((prevCount) => prevCount - 7);
  };

  // console.log("courseDates---", courseDates.endDate);

  return (
    <React.Fragment>
      <div className="next-previousbuttons">
        <button
          type="button"
          onClick={handlePreviousWeek}
          style={{
            visibility:
              (courseDates.startDate !== "--/--/----" &&
                headername === 0 &&
                "hidden") ||
              "visible",
          }}
        >{`<`}</button>
        <button type="button" onClick={handleNextWeek}>{`>`}</button>
      </div>
      <div className="table-responsive admin-table-wrapper draft-table-wrapper my-3 ">
        <Table className="draft-table mb-0" {...getTableProps}>
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

          <tbody {...getTableBodyProps}>
            {rows.map((row: any, index) => {
              prepareRow(row);
              if (row.original.breakTime === true) {
                return (
                  <tr {...row.getRowProps()} key={index}>
                    <td>{row.original.timeSlot}</td>
                    <td colSpan={columns.length - 2}>
                      {row.original.breakType}
                    </td>
                  </tr>
                );
              }

              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell: any, index: number) => {
                    if (row.index > 0) {
                      if (cell.column.id === "timeSlot") {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={cell.column.id}
                            key={index}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      } else {
                        let cellValue = JSON.parse(cell.value);
                        if (cellValue.status !== "weekend") {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={cellValue.status}
                              key={index}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        } else {
                          <td></td>;
                        }
                      }
                    } else {
                      if (cell.column.id === "timeSlot") {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={cell.column.id}
                            key={index}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      } else {
                        let cellValue = JSON.parse(cell.value);
                        if (cellValue.status !== "weekend") {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={cellValue.status}
                              key={index}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        } else {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={cellValue.status}
                              rowSpan={SlotData.length}
                              key={index}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        }
                      }
                    }
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

export default DraftVersionTable;
