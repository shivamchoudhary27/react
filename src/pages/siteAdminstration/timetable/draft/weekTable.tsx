import { useTable } from "react-table";
import React, { useEffect, useState, useMemo } from "react";
import { Table } from "react-bootstrap";
import { addDays, format, startOfWeek } from "date-fns";

const WeeklyTimetable = ({data, apiStatus} : any) => {

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
            Header: "Thrusday",
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
        }
    ];
    
    // Initialize the table instance
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
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
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                borderBottom: "1px solid #ccc",
                                                padding: "8px",
                                                // textAlign: "center",
                                                background: cell.value ? "#e6f7ff" : "#f2f2f2", // Adjust colors as needed
                                            }}
                                        >
                                            {cell.render("Cell")}
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
