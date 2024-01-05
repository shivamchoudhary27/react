import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import React, { useMemo, useState } from "react";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

type Props = {
  apiStatus: string;
  toggleModalShow: any;
  editHandlerById: any;
  helpdeskManagementData: any[];
};

const HelpdeskManagementTable = (props: Props) => {
  const tableColumn = [
    {
      Header: "SN",
      Cell: ({ row }: any) => {
        return row.index + 1;
      },
    },
    {
      Header: "FullName",
      accessor: "fullname",
      Cell: ({ row }: any) => {
        // Access the "FullName" value from the row object
        const fullName = row.original.firstName + " " + row.original.lastName;
        return fullName;
      },
    },
    {
      Header: "Email",
      accessor: "email",
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
      Cell: ({ value }: any) => {
        // Assuming 'value' is a valid date string from the API
        const dateObject = new Date(value);

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(dateObject);
        return <span>{formattedDate}</span>;
      },
    },
    {
      Header: "All replies",
      Cell: ({ row }: any) => {
        return (
          <Link
            to=""
            // onClick={() =>
            //   onClickViewAllHandler({
            //     topic: row.original.topic,
            //     createDate: row.original.date,
            //   })
            // }
          >
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
            // onClick={() => {
            //   props.toggleRepliesModalShow({ status: true, action: "reply" });
            // }}
          >
            {row.original.status !== "close" && "Reply"}
          </Link>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value, row }: any) => {
        const isEditable = value === "open";

        return (
          <>
            {value === "open" ? "Open" : "Close"}
            <Link to={``}>
              <FontAwesomeIcon
                style={{ color: value !== "open" ? "#FF9E9E" : "" }}
                className="px-2"
                icon={faEdit}
                onClick={() =>
                  handleStatusEditClick({
                    id: row.original.id,
                    status: row.original.status,
                    query: row.original.query,
                  })
                }
              />
            </Link>
          </>
        );
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(
    () => props.helpdeskManagementData,
    [props.helpdeskManagementData]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // edit event handler === >>>
  const handleStatusEditClick = ({ id, status, query }: any) => {
    console.log(id);
    console.log(status);
    props.toggleModalShow(true);
    props.editHandlerById({
      id,
      status,
      query,
    });
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
        {props.apiStatus === "started" &&
          props.helpdeskManagementData.length === 0 && (
            <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          )}
        {props.apiStatus === "finished" &&
          props.helpdeskManagementData.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
      </div>
    </React.Fragment>
  );
};

export default HelpdeskManagementTable;
