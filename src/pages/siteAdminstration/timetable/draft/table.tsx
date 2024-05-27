import "./style.scss";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { FirstDayOfMonth } from "./utils";
import { tableColumnTemplate } from "./utils";
import { addDays, format, startOfWeek,} from "date-fns";
import React, { useMemo, useState, useEffect } from "react";
import { formatDateWithDetails } from "../../../../lib/timestampConverter";

const DraftVersionTable = ({getModalFormData, toggleModalShow, SlotData, courseDates, updateTimetableDates, handleMonthFilter,setChangeFilterStatus }: any) => {
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
  const [weekNavs, setWeekNavs] = useState({ next: true, prev: true });

  const handleMassegeClick = (weekday: any, description: any, timeSlotId: any, sessionDate: any, slotDetailId: any,changeRequestId:any,status:any) => {
    getModalFormData(weekday, description, timeSlotId, sessionDate, slotDetailId,changeRequestId,status)
      toggleModalShow(true)
  }

  function getMonday(dayOfWeek: number) {

    switch (dayOfWeek) {
      case 0:
        return 0;
      case 1:
        return 6;
      case 2:
        return 5;
      case 3:
        return 4;
      case 4:
        return 3;
      case 5:
        return 2;
      case 6:
        return 1;
      default:
        return 0; // Default case, return 0 if input is not a valid day of the week
    }
  }

  useEffect(() => {
    let month = 0;
    let year = 0;
    const monthYearString = handleMonthFilter[0];
    if (monthYearString) {
      [month, year] = monthYearString.split(',');
    }
    if (handleMonthFilter.length > 0 && handleMonthFilter[0] !== "0") {
      let firstDayOfMonth = FirstDayOfMonth(month, year); // Assuming this function gives you the first day of the month

      let formattedStartDate = courseDates.startDate === "--/--/----" ? currentDate : formatDateWithDetails(courseDates.startDate);
      let startDate = new Date(formattedStartDate);
      let DateFromfilter = new Date(firstDayOfMonth);
      let differenceInMillis = startDate - DateFromfilter;

      // Convert milliseconds to days
      let differenceFromFilterOrStartDate = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
      let days = DateFromfilter.getDay();

      let differenceToGetMonday = getMonday(days);
      let NumberOfmonday = Math.abs(differenceFromFilterOrStartDate) + differenceToGetMonday;
      let monday = NumberOfmonday < 7 ? 0 : NumberOfmonday;


      setWeekAmount(monday);
    } else {
      setWeekAmount(0)
    }
  }, [handleMonthFilter]);


  useEffect(() => {
    setWeekAmount(0)
  }, [courseDates])

  // render next week days === >>
  useEffect(() => {
    const nextWeekDates = calculateWeek(weekAmount);

    setRenderWeek(nextWeekDates);

    if (courseDates.noneSelected === true) {
      setWeekNavs({ next: false, prev: false })
    } else {
      setWeekNavs({ next: true, prev: true })
    }
  }, [courseDates, weekAmount]);

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
              // && format(date, 'dd-MM-yyyy') >= courseDates.startDate.replaceAll('/','-') && 'Available' + format(date, 'dd-MM-yyyy')
              <div> 
                {currentColumns.status === "draft" &&
                  currentColumns.bookedDetais}
                  {currentColumns.status === "changeRequest" && <div >
                  <i className="fa-solid fa-envelope-circle-check"></i>
                  {currentColumns.bookedDetais}
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

  // next 7 days week handler === >>
  const handleNextWeek = () => {
    const nextWeekDates = calculateWeek(weekAmount + 7);
    const nextWeekAvailable = isNextWeekAvailable(nextWeekDates, courseDates.endDateTimeStamp);

    const firstDate = nextWeekDates[0];
    const monthYearString = firstDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const formattedDate = monthYearString.replace(/\s+/g, ',')
    setChangeFilterStatus(formattedDate)

    if (nextWeekAvailable) {
      setRenderWeek(nextWeekDates);
      setWeekAmount((prevCount) => prevCount + 7);
      setWeekNavs((previous) => ({ ...previous, prev: true }));
    } else {
      setWeekNavs((previous) => ({ ...previous, next: false }));
    }
  };

  // previous 7 days handler === >>
  const handlePreviousWeek = () => {

    const previousWeekDates = calculateWeek(weekAmount - 7);
    const previousWeekAvailable = isPreviousWeekAvailable(previousWeekDates, courseDates.startDateTimeStamp);

    const firstDate = previousWeekDates[0];
    const monthYearString = firstDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const formattedDate = monthYearString.replace(/\s+/g, ',')
    setChangeFilterStatus(formattedDate)

    if (previousWeekAvailable) {
      setRenderWeek(previousWeekDates);
      setWeekAmount((prevCount) => prevCount - 7);
      setWeekNavs((previous) => ({ ...previous, next: true }));
    } else {
      setWeekNavs((previous) => ({ ...previous, prev: false }));
    }
  };

  // check the availability of next week === >>
  const isNextWeekAvailable = (nextWeekDates: any, endDate: number) => {
    if (endDate === 0) return false;

    const weekStart = convertToTimestamp(nextWeekDates[0]);
    const weekEnd = convertToTimestamp(nextWeekDates[6]);

    if (endDate > weekEnd) return true;
    else if (endDate < weekStart) return false;
    else if (endDate >= weekStart && endDate <= weekEnd) return true;
    else return false;
  }

  // check the availability of previous week === >>
  const isPreviousWeekAvailable = (previousWeekDates: any, startDate: number) => {
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
    const dateObject = new Date(weekDate);
    return dateObject.getTime();
  }

  // calculate week days === >>
   const calculateWeek = (amount: number) => {
    const formattedStartDate = courseDates.startDate === "--/--/----" ? currentDate : formatDateWithDetails(courseDates.startDate);
    const StartDateFormat = formattedStartDate;
    const nextMonday = addDays(
      startOfWeek(StartDateFormat, { weekStartsOn: 1 }),
      amount
    );
    const startOfChosenWeek = startOfWeek(nextMonday, { weekStartsOn: 1 });
    const weekDates = [...Array(7).keys()].map((offset) =>
      addDays(startOfChosenWeek, offset)
    );
    return weekDates;
  }

  const checkDateDifference = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const dateDifference = Math.abs((endDate - startDate) / (1000 * 60 * 60 * 24));
    const days = startDate.getDay();

    if (dateDifference > 6) {
      return true; // Difference is greater than 6 days
    } else if (
      (days === 0 && dateDifference === 0) ||
      (days === 1 && dateDifference === 6) ||
      (days === 2 && dateDifference === 5) ||
      (days === 3 && dateDifference === 4) ||
      (days === 4 && dateDifference === 3) ||
      (days === 5 && dateDifference === 2) ||
      (days === 6 && dateDifference === 1)
    ) {
      return false; // Conditions met, return false
    } else if (isNaN(dateDifference)) {
      return false; // dateDifference is NaN
    } else {
      return true; // Other cases, return true
    }
  }

  // Assuming formatDateWithDetails() is defined properly and courseDates is provided
  const areoButton = checkDateDifference(formatDateWithDetails(courseDates.startDate), formatDateWithDetails(courseDates.endDate))

  function countWeekendStatus(obj) {
    let count = 0;
    for (let day in obj) {
      if (obj.hasOwnProperty(day) && obj[day] === '{"status":"weekend"}') {
        count++;
      }
    }
    return count;
  }

  return (
    <React.Fragment>
      <div className="next-previousbuttons">
        <button
          type="button"
          style={{ visibility: weekNavs.prev && areoButton === true ? 'visible' : 'hidden' }}
          // className={`btn ${weekNavs.prev ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={handlePreviousWeek}
        // disabled={!weekNavs.prev}
        >
          {'<'} {/* Render the '<' symbol */}
        </button>
        <button
          type="button"
          // className={`btn ${weekNavs.next ? 'btn-primary' : 'btn-secondary'}`} 
          style={{ visibility: weekNavs.next && areoButton === true ? 'visible' : 'hidden' }}
          onClick={handleNextWeek}
        // disabled={!weekNavs.next}
        >
          {`>`}
        </button>
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
              const weekendStatus = countWeekendStatus(row.original)
              const breakSlotLength = 7 - weekendStatus
              prepareRow(row);
              if (row.original.breakTime === true) {
                return (
                  <tr {...row.getRowProps()} key={index}>
                    <td>{row.original.timeSlot}</td>
                    {[...Array(breakSlotLength)].map((_, index: number) => (
                      <td key={index} className="weekend" >
                        {row.original.breakType}
                      </td>
                    ))}
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
                              onClick={cellValue.status === "changeRequest"? () => handleMassegeClick(cellValue.weekDay, cellValue.bookedDetais, cellValue.timeSlotId, cellValue.sessionDate, cellValue.slotDetailId, cellValue.changeRequestId,cellValue.status) : undefined}
                              style={{ cursor: cellValue.status !== "available"  ? 'pointer' : 'default' }}
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
