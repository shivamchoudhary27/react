import "./style.scss"
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import React, { useMemo, useState } from "react";
import Errordiv from "../../../widgets/alert/errordiv";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import TableSkeleton from "../../../widgets/skeleton/table";

type Props = {
  currentUserInfo: any;
  newAttendancePacket: any[];
  apiStatus: string
};

const TeacherAttendanceTable = (props: Props) => {
  const tableColumn = [
    {
      Header: "Full Name",
      Cell: ({row}: any) => {
        return (
          <span>{`${row.original.firstname} ${row.original.lastname}`}</span>
        );
      },
    },
    {
      Header: "Email",
      accessor: "email"
    },
    // {
    //   Header: "Attendance Name",
    //   accessor: "attendancename"
    // },
    {
      Header: "P L E A",
      accessor: "",
      Cell: ({row}: any) => {
        return (
          <div>
            {row.original.P !== undefined ? row.original.P : 0}{" "}
            {row.original.L !== undefined ? row.original.L : 0}{" "}
            {row.original.E !== undefined ? row.original.E : 0}{" "}
            {row.original.A !== undefined ? row.original.A : 0}
          </div>
        );
      },
    },
    {
      Header: "Points",
      accessor: "points",
      Cell: () => {
        return <span>36</span>;
      },
    },
    {
      Header: "Percentage",
      accessor: "overallpercentage",
      Cell: () => {
        return <span>42%</span>;
      },
    },
    {
      Header: "Nov 30",
      accessor: "nov30",
      Cell: () => {
        return <span>P</span>;
      },
    },
    {
      Header: "Nov 29",
      accessor: "nov29",
      Cell: () => {
        return <span>P</span>;
      },
    },
    {
      Header: "Nov 28",
      accessor: "nov28",
      Cell: () => {
        return <span>L</span>;
      },
    },
    {
      Header: "Nov 27",
      accessor: "nov27",
      Cell: () => {
        return <span>E</span>;
      },
    },
    {
      Header: "Nov 26",
      accessor: "nov26",
      Cell: () => {
        return <span>A</span>;
      },
    },
    {
      Header: "Nov 25",
      accessor: "nov25",
      Cell: () => {
        return <span>P</span>;
      },
    },
    {
      Header: "Nov 24",
      accessor: "nov24",
      Cell: () => {
        return <span>P</span>;
      },
    },
    {
      Header: "Nov 23",
      accessor: "nov23",
      Cell: () => {
        return <span>P</span>;
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => props.newAttendancePacket, [props.newAttendancePacket]);
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
        <Table borderless striped {...getTableProps} className="attandence-table">
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
        {props.apiStatus === "started" && props.newAttendancePacket.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {props.apiStatus === "finished" && props.newAttendancePacket.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default TeacherAttendanceTable;
