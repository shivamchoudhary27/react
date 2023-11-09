import React, { useMemo, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { deleteData, putData } from "../../../../adapters/coreservices";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../../../store/slices/globalAlerts";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import { draftData as dummyData } from "./data";
import { addDays, format, startOfWeek } from "date-fns";
import CustomButton from "../../../../widgets/formInputFields/buttons";

// Actions btns styling === >>>
const actionsStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
};

const tableColumnTemplate = [
    {
    Header: "Time Slots",
    accessor: "timeSlot",
    },
    {
    Header: `Monday`,
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

const DraftVersionTable = ({ SlotData, apiStatus }: any) => {
    const currentDate = new Date();
    const [headername, setHeadername] = useState(0);
    const [tableColumn, setTableColumn] = useState(tableColumnTemplate);
    // react table custom variable decleration === >>>
    const columns = useMemo(() => tableColumn, [tableColumn]);
    const data = useMemo(() => SlotData, [SlotData]);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
        columns,
        data,
        });
    
    useEffect(() => {
        const nextMonday = addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), headername); // 1 corresponds to Monday, add 7 days for the next week
        const startOfCurrentWeek = startOfWeek(nextMonday, { weekStartsOn: 1 });
        const weekDates = [...Array(7).keys()].map((offset) =>
          addDays(startOfCurrentWeek, offset)
        );

        const newWeekColumns = [
            {
              Header: "Time Slots",
              accessor: "timeSlot",
            },
            ...weekDates.map((date, index) => ({
                // console.log(format(date, "EEEE").toLowerCase());
              Header: `${format(date, "EEEE")} \n ${format(date, "d-M-Y")}`,
              accessor: format(date, "EEEE").toLowerCase() , // Use a dynamic accessor for each day
            })),
        ];
        setTableColumn(newWeekColumns);
    }, [headername]);

    const handleNextWeek = () => {
        setHeadername(prevCount => prevCount + 7);
    }

    const handlePreviousWeek = () => {
        setHeadername(prevCount => prevCount - 7);
    }


    return (
        <React.Fragment>
            <CustomButton
                type="button"
                btnText="<<"
                variant="primary"
                onClick={handlePreviousWeek}
            />
            {"   "}
            <CustomButton
                type="button"
                btnText=">>"
                variant="primary"
                onClick={handleNextWeek}
            />
        <div className="table-responsive admin-table-wrapper mt-3">
            <Table borderless striped {...getTableProps}>
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
                {rows.map((row, index) => {
                    prepareRow(row);
                    if (row.original.breakTime === true) {
                        return (
                            <tr {...row.getRowProps()} key={index}>
                            <td >{row.original.timeSlot}</td>
                            <td colSpan={columns.length}>{row.original.monday}</td>
                            </tr>
                        );
                    }

                return (
                    <tr {...row.getRowProps()} key={index}>
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
        </div>
        </React.Fragment>
    );
};

export default DraftVersionTable;
