import { useTable } from "react-table";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import Errordiv from "../../../widgets/alert/errordiv";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import TableSkeleton from "../../../widgets/skeleton/table";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../globals/TableFilterShorting/TableFieldShorting";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";

type Props = {
  apiStatus: string;
  editHandlerById: any;
  toggleModalShow: any;
  getSelectedTopicId: any;
  toggleRepliesModalShow: any;
  helpdeskManagementData: any[];
  filterUpdateTable: any;
  filterUpdate: any;
  setFilterUpdate: any;
};

const HelpdeskManagementTable = (props: Props) => {
  const { handleTableSorting } = useTableSorting();

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
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() =>
              handleTableSorting("firstName", props.setFilterUpdate)
            }
          >
            <span> First Name </span>
            <span>
              {props.filterUpdate.sortBy === "firstName" &&
              props.filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by First Name Ascending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "firstName" &&
                props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by First Name Descending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by First Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <PiArrowsDownUpBold />
                  </button>
                </OverlayTrigger>
              )}
            </span>
          </span>
        </div>
      ),
      accessor: "firstName",
      Cell: ({ row }: any) => {
        // Access the first name from the row object
        const firstName = row.original.firstName;

        // Capitalize the first character of the first name
        const capitalizedFirstName = `${firstName
          .charAt(0)
          .toUpperCase()}${firstName.slice(1)}`;
        return capitalizedFirstName;
      },
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() =>
              handleTableSorting("lastName", props.setFilterUpdate)
            }
          >
            <span> Last Name </span>
            <span>
              {props.filterUpdate.sortBy === "lastName" &&
              props.filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Last Name Ascending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "lastName" &&
                props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Last Name Descending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Last Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <PiArrowsDownUpBold />
                  </button>
                </OverlayTrigger>
              )}
            </span>
          </span>
        </div>
      ),
      accessor: "lastName",
      Cell: ({ row }: any) => {
        // Access the last name from the row object
        const lastName = row.original.lastName;

        // Capitalize the first character of the last name
        const capitalizedLastName = `${lastName
          .charAt(0)
          .toUpperCase()}${lastName.slice(1)}`;
        return capitalizedLastName;
      },
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("email", props.setFilterUpdate)}
          >
            <span> Email </span>
            <span>
              {props.filterUpdate.sortBy === "email" &&
              props.filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Email Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "email" &&
                props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Email Descending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Email Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <PiArrowsDownUpBold />
                  </button>
                </OverlayTrigger>
              )}
            </span>
          </span>
        </div>
      ),
      accessor: "email",
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() =>
              handleTableSorting("topicName", props.setFilterUpdate)
            }
          >
            <span> Topic </span>
            <span>
              {props.filterUpdate.sortBy === "topicName" &&
              props.filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Topic Name Ascending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "topicName" &&
                props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Topic Name Descending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Topic Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <PiArrowsDownUpBold />
                  </button>
                </OverlayTrigger>
              )}
            </span>
          </span>
        </div>
      ),
      accessor: "topicName",
      Cell: ({ value }: any) =>
        `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
    },
    {
      Header: "Query",
      accessor: "query",
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("date", props.setFilterUpdate)}
          >
            <span> Date </span>
            <span>
              {props.filterUpdate.sortBy === "date" &&
              props.filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Date Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : props.filterUpdate.sortBy === "date" &&
                props.filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Date Descending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Date Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <PiArrowsDownUpBold />
                  </button>
                </OverlayTrigger>
              )}
            </span>
          </span>
        </div>
      ),
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
  const columns = useMemo(
    () => tableColumn,
    [serialPageNo, props.filterUpdate]
  );
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
