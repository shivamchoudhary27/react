import { useTable } from "react-table";
import { Table, Button } from "react-bootstrap";
import React, { useMemo, useState, useEffect } from "react";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

type Props = {
  //   dummyData: any[];
  //   toggleRepliesModalShow: any;
};

const dummyData = [
  {
    topic: "Video viewing",
    fullname: "Priya Nagaar",
    latestReply:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "December 19, 2023",
    status: "Open",
  },
  {
    topic: "Video viewing",
    fullname: "Goutam Das",
    latestReply:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "December 19, 2023",
    status: "Open",
  },
  {
    topic: "Video viewing",
    fullname: "Alok Rai",
    latestReply:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "December 19, 2023",
    status: "Open",
  },
];

const HelpdeskManagementTable = (props: Props) => {
  const tableColumn = [
    {
      Header: "SN",
      Cell: ({ row }: any) => {
        return row.index + 1;
      },
    },
    {
      Header: "Full Name",
      accessor: "fullname",
    },
    {
      Header: "Topic",
      accessor: "topic",
    },
    {
      Header: "Latest reply",
      accessor: "latestReply",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => dummyData, [dummyData]);
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
        {/* {apiStatus === "started" && timeslotList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && timeslotList.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )} */}
      </div>
    </React.Fragment>
  );
};

export default HelpdeskManagementTable;
