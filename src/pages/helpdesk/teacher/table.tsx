import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import Errordiv from "../../../widgets/alert/errordiv";
import TableSkeleton from "../../../widgets/skeleton/table";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { useSelector } from "react-redux";

type Props = {
  enquiryData: any;
  apiStatus: any;
  toggleRepliesModalShow: any;
  getSelectedTopicId: any;
  filterUpdate:any;
  
};
const TeacherHelpdeskTable = (props: Props) => {

  const [serialPageNo, setSerialPageNo] = useState(props.filterUpdate.pageNumber)

  const authenticatedUserPermission = useSelector(
    (state: any) => state.authenticatedUser.permissions.menu
);

const menuPermission = useSelector(
  (state: any) => state.userAuthorities.permissions.menu
);

  useEffect(() => {
    setSerialPageNo(props.filterUpdate.pageNumber * props.filterUpdate.pageSize)
  }, [props.filterUpdate.pageNumber])

  const tableColumn = [
    {
      Header: "SN",
      Cell: ({ row }: any) => {
        let serialNumber= serialPageNo + row.index + 1
            return serialNumber
      },
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
    // {
    //   Header: "All replies",
    //   Cell: ({ row }: any) => {
    //     return (
    //       <Link
    //         to=""
    //         onClick={() =>
    //           onClickViewAllHandler(
    //             row.original.id,
    //             row.original.topicName,
    //             row.original.date
    //           )
    //         }
    //       >
    //         {
    //           (menuPermission.admin.canView || authenticatedUserPermission.enquiry.canView) ? 'View All': ''
    //         }
    //       </Link>
    //     );
    //   },
    // },

    ...(menuPermission.admin.canView || !authenticatedUserPermission.enquiry.canView
      ? [
          {
            Header: "All replies",
            accessor: "__dummy__", // Dummy accessor
            Cell: ({ row }: any) => (
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
            ),
          },
        ]
      : []),

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
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, [serialPageNo]);
  const data = useMemo(() => props.enquiryData, [props.enquiryData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

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
