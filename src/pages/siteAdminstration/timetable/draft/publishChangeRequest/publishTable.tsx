import "../style.scss";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { tableColumnTemplate } from "../utils";
import React, { useMemo, useState, useEffect } from "react";
import { addDays, format, startOfWeek, parse } from "date-fns";
import { useSelector } from "react-redux";

const PublishedTable = ({ SlotData, apiStatus, courseDates, updateTimetableDates, selectedMonth }: any) => {
  const currentDate = new Date();
  const [weekAmount, setWeekAmount] = useState(0);
  const [tableColumn, setTableColumn] = useState(tableColumnTemplate);
  const columns = useMemo(() => tableColumn, [tableColumn]);
  const data = useMemo(() => SlotData, [SlotData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [renderWeek, setRenderWeek] = useState<any>([]);
  const [weekNavs, setWeekNavs] = useState({next: true, prev: true});

  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  // render next week days === >>
  useEffect(() => {
    const nextWeekDates = calculateWeek(0);
    
    setRenderWeek(nextWeekDates);
    setWeekAmount(0);

    if (courseDates.noneSelected === true) {
      setWeekNavs({next: false, prev: false})
    } else {
      setWeekNavs({next: true, prev: true})
    }
  }, [courseDates]);

  // render week days === >>
  useEffect(() => {
    if (renderWeek.length > 0) {
      updateTimetableDates({
        startDate: format(renderWeek[0], 'dd-MM-yyyy'),
        endDate: format(renderWeek[6], 'dd-MM-yyyy'),
      });

      const newWeekColumns = [
        {
          Header: "Time Slots",
          accessor: "timeSlot",
        },
        ...renderWeek.map((date: Date, index: number) => ({
          Header: (
            <>
              <div>{`${format(date, "EEEE")}`}</div>
              <div>{`${format(date, "dd-MMM-yy")}`} </div>
            </>
          ),
          accessor: format(date, "EEEE").toLowerCase(), // Use a dynamic accessor for each day
          Cell: ({ row }: any) => {
            let currentColumns = JSON.parse(
              row.original[format(date, "EEEE").toLowerCase()]
            );
            return (
              // <div> 
              //   {currentColumns.status === "booked" &&
              //     currentColumns.bookedDetais}
              //   {currentColumns.status === "available" && ""}
              //   {currentColumns.status === "weekend" && "Weekend"}
              // </div>
              <div> 
                {currentColumns.status === "draft" &&
                  currentColumns.bookedDetais}
                  {currentColumns.status === "changeRequest" && <div >
                  <i className="fa-solid fa-envelope-circle-check"></i>
                  {currentColumns.bookedDetais} <br />
                  <b>{currentUserInfo.first_name} {currentUserInfo.last_name}</b>
                </div>}
                 {currentColumns.status === "not_available" && 
                  currentColumns.bookedDetais}
                {currentColumns.status === "available" && ""}
                {currentColumns.status === "weekend" && "Weekend"}  
              </div>
            );
          },
        })),
      ];
      setTableColumn(newWeekColumns);
    }
  }, [renderWeek]);
  
  useEffect(() => {
    // console.log(renderWeek)
  }, [selectedMonth])

  // next 7 days week handler === >>
  const handleNextWeek = () => {
    const nextWeekDates = calculateWeek(weekAmount + 7);
    const nextWeekAvailable = isNextWeekAvailable(nextWeekDates, courseDates.endDateTimeStamp);

    if (nextWeekAvailable) {
      setRenderWeek(nextWeekDates);
      setWeekAmount((prevCount) => prevCount + 7);
      setWeekNavs((previous) => ({...previous, prev: true}));
    } else {
      setWeekNavs((previous) => ({...previous, next: false}));
    }
  };

  // previous 7 days handler === >>
  const handlePreviousWeek = () => {
    const previousWeekDates = calculateWeek(weekAmount - 7);
    const previousWeekAvailable = isPreviousWeekAvailable(previousWeekDates, courseDates.startDateTimeStamp);

    if (previousWeekAvailable) {
      setRenderWeek(previousWeekDates);
      setWeekAmount((prevCount) => prevCount - 7);
      setWeekNavs((previous) => ({...previous, next: true}));
    } else {
      setWeekNavs((previous) => ({...previous, prev: false}));
    }
  };

  // check the availability of next week === >>
  const isNextWeekAvailable = (nextWeekDates: any, endDate : number) => {
    if (endDate === 0) return false;

    const weekStart = convertToTimestamp(nextWeekDates[0]);
    const weekEnd = convertToTimestamp(nextWeekDates[6]);

    if (endDate > weekEnd) return true;
    else if (endDate < weekStart) return false;
    else if (endDate >= weekStart && endDate <= weekEnd) return true;
    else return false;
  }

  // check the availability of previous week === >>
  const isPreviousWeekAvailable = (previousWeekDates: any, startDate : number) => {
    if (startDate === 0) return false;

    const weekStart = convertToTimestamp(previousWeekDates[0]);
    const weekEnd = convertToTimestamp(previousWeekDates[6]);

    if (startDate < weekStart) return true;
    else if (startDate < weekEnd) return true;
    else if (startDate > weekEnd) return false;
    else return false;
  }

  // convert week date to timestamp === >>
  const convertToTimestamp = (weekDate: string) => {
    const dateObject =  new Date(weekDate);
    return dateObject.getTime();
  } 

  // calculate week days === >>
  const calculateWeek = (amount: number) => {
    const nextMonday = addDays(
      startOfWeek(currentDate, { weekStartsOn: 1 }),
      amount 
    );
    const startOfChosenWeek = startOfWeek(nextMonday, { weekStartsOn: 1 });
    const weekDates = [...Array(7).keys()].map((offset) =>
      addDays(startOfChosenWeek, offset)
    );
    return weekDates; 
  }
  
  return (
    <React.Fragment>
      <div className="next-previousbuttons">
        {weekNavs.prev && <button type="button" onClick={handlePreviousWeek}>{`<`}</button>}
        {weekNavs.next && <button type="button" onClick={handleNextWeek}>{`>`}</button>}
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

export default PublishedTable;
