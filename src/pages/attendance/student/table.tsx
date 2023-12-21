import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import Errordiv from "../../../widgets/alert/errordiv";
import React, { useMemo, useState, useEffect } from "react";
import TableSkeleton from "../../../widgets/skeleton/table";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { convertTimestampToDate } from "../../../lib/timestampConverter";

type Props = {
  currentUserInfo: any;
  attendancedata: any[];
  apiStatus: string;
};

const StudentAttendanceTable = (props: Props) => {
  const tableColumn = [
    {
      Header: "Date",
      Cell: ({ row }: any) => {
        return (
          row.original.sessdate !== "" &&
          convertTimestampToDate(row.original.sessdate)
        );
      },
    },
    {
      Header: "Session Name",
      accessor: "sessionname",
    },
    {
      Header: "Session Type",
      accessor: "mode",
    },
    {
      Header: "Present (P)",
      Cell: ({ row }: any) => {
        return row.original.description === "Present" ? "P" : "--";
      },
    },
    {
      Header: "Late (L)",
      Cell: ({ row }: any) => {
        return row.original.description === "Late" ? "L" : "--";
      },
    },
    {
      Header: "Excused (E)",
      Cell: ({ row }: any) => {
        return row.original.description === "Excused" ? "E" : "--";
      },
    },
    {
      Header: "Absent (A)",
      Cell: ({ row }: any) => {
        return row.original.description === "Absent" ? "A" : "--";
      },
    },
    {
      Header: "Points",
      Cell: ({ row }: any) => {
        return row.original.point ? Math.round(row.original.point) : 0;
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => props.attendancedata, [props.attendancedata]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
        <TimerAlertBox
          className="mt-3"
          showAlert={showAlert}
          alertMsg={alertMsg.message}
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
        />
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
        {props.apiStatus === "started" && props.attendancedata.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {props.apiStatus === "finished" &&
          props.attendancedata.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
      </div>
    </React.Fragment>
  );
};

export default StudentAttendanceTable;
