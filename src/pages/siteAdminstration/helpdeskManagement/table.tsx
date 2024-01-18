import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import Errordiv from "../../../widgets/alert/errordiv";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import TableSkeleton from "../../../widgets/skeleton/table";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  apiStatus: string;
  editHandlerById: any;
  toggleModalShow: any;
  getSelectedTopicId: any;
  toggleRepliesModalShow: any;
  helpdeskManagementData: any[];
  filterUpdateTable: any;
};

const HelpdeskManagementTable = (props: Props) => {
  const [serialPageNo, setSerialPageNo] = useState(
    props.filterUpdateTable.pageNumber
  );
  useEffect(() => {
    setSerialPageNo(
      props.filterUpdateTable.pageNumber * props.filterUpdateTable.pageSize
    );
  }, [props.filterUpdateTable.pageNumber]);

  const tableColumn = [
    {
      Header: "SN",
      Cell: ({ row }: any) => {
        let serialNumber = serialPageNo + row.index + 1;
        return serialNumber;
      },
    },
    {
      Header: "FullName",
      accessor: "fullname",
      Cell: ({ row }: any) => {
        // Access the first and last names from the row object
        const firstName = row.original.firstName;
        const lastName = row.original.lastName;

        // Capitalize the first character of the full name
        const capitalizedFullName = `${firstName
          .charAt(0)
          .toUpperCase()}${firstName.slice(1)} ${lastName
          .charAt(0)
          .toUpperCase()}${lastName.slice(1)}`;

        return capitalizedFullName;
      },
    },

    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Topic",
      accessor: "topicName",
      Cell: ({ value }: any) =>`${value.charAt(0).toUpperCase()}${value.slice(1)}`
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
            onClick={() =>
              onClickViewAllHandler(
                row.original.id,
                row.original.topicName,
                row.original.date
              )
            }
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
            onClick={() =>
              onClickReplyHandler(
                row.original.id,
                row.original.topicName,
                row.original.date
              )
            }
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
  const columns = useMemo(() => tableColumn, [serialPageNo]);
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
    props.toggleModalShow(true);
    props.editHandlerById({
      id,
      status,
      query,
    });
  };

  const onClickViewAllHandler = (
    id: number,
    topicname: string,
    dateValue: any
  ) => {
    props.getSelectedTopicId(id);
    props.toggleRepliesModalShow({
      status: true,
      action: "allview",
      topicname: topicname,
      dateValue: dateValue,
    });
  };

  const onClickReplyHandler = (
    id: number,
    topicname: string,
    dateValue: any
  ) => {
    props.getSelectedTopicId(id);
    props.toggleRepliesModalShow({
      status: true,
      action: "reply",
      topicname: topicname,
      dateValue: dateValue,
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
