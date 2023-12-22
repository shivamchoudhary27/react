import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useMemo, useState } from "react";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";

type Props = {
  enquiryData: any[];
  apiStatus: any;
  toggleRepliesModalShow: any;
  getSelectedTopicId: any;
};

const TeacherHelpdeskTable = (props: Props) => {
  const tableColumn = [
    {
      Header: "SN",
      Cell: ({ row }: any) => {
        return row.index + 1;
      },
    },
    {
      Header: "Topic",
      accessor: "topicName",
    },
    {
      Header: "Query",
      accessor: "query",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "All replies",
      Cell: ({ row }: any) => {
        return (
          <Link to="" onClick={() => onClickViewAllHandler(row.original.id)}>
            View All
          </Link>
        );
      },
    },
    {
      Header: "Action",
      Cell: ({ row }: any) => {
        return (
          <Link
            to=""
            onClick={() => {
              props.toggleRepliesModalShow({ status: true, action: "reply" });
            }}
          >
            Reply
          </Link>
        );
      },
    },
    {
      Header: "Status",
      accessor: "published",
      Cell: ({ value }: any) => {
        return value ? "Open" : "Close";
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => props.enquiryData, [props.enquiryData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const onClickViewAllHandler = (id: number) => {
    props.getSelectedTopicId(id)
    props.toggleRepliesModalShow({ status: true, action: "allview" });
  };

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
        {props.apiStatus === "started" && props.enquiryData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {props.apiStatus === "finished" && props.enquiryData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default TeacherHelpdeskTable;
