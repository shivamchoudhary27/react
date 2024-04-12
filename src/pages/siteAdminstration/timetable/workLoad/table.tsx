import { useTable } from "react-table";
import { Link } from "react-router-dom";
// import Table from "react-bootstrap/Table";
import React, { useMemo, useState } from "react";
import { PiArrowsDownUpBold } from "react-icons/pi";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const WorkLoadTable = ({
  apiStatus,
  workLoadData,
  filterUpdate,
  setFilterUpdate,
}: any) => {

  // call global function handleTableSorting
  const { handleTableSorting } = useTableSorting();
  
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("userFirstName", setFilterUpdate)}
          >
            <span> First Name </span>
            <span>
              {filterUpdate.sortBy === "userFirstName" &&
              filterUpdate.sortOrder === "asc" ? (
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
              ) : filterUpdate.sortBy === "userFirstName" &&
                filterUpdate.sortOrder === "desc" ? (
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
      accessor: "userFirstName",
      Cell: ({ row }: any) => {
        return `${row.original.userFirstName}`;
      },
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("userLastName", setFilterUpdate)}
          >
            <span> Last Name </span>
            <span>
              {filterUpdate.sortBy === "userLastName" &&
              filterUpdate.sortOrder === "asc" ? (
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
              ) : filterUpdate.sortBy === "userLastName" &&
                filterUpdate.sortOrder === "desc" ? (
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
      accessor: "userLastName",
      Cell: ({ row }: any) => {
        return `${row.original.userLastName}`;
      },
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("userEmail", setFilterUpdate)}
          >
            <span> Email </span>
            <span>
              {filterUpdate.sortBy === "userEmail" &&
              filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Email Ascending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : filterUpdate.sortBy === "userEmail" &&
                filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Email Descending </BsTooltip>
                  }
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
      accessor: "userEmail",
    },
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("departmentName", setFilterUpdate)}
          >
            <span> Department </span>
            <span>
              {filterUpdate.sortBy === "departmentName" &&
              filterUpdate.sortOrder === "asc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Department Ascending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                  </button>
                </OverlayTrigger>
              ) : filterUpdate.sortBy === "departmentName" &&
                filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <BsTooltip>Sorted by Department Descending </BsTooltip>
                  }
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortDescending />
                  </button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Department Ascending </BsTooltip>}
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
      accessor: "departmentName",
    },
    {
      Header: "View / Edit Work Load",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to={`/manageworkload/${row.original.userId}`}>View</Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => workLoadData, [workLoadData]);
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
        {apiStatus === "started" && workLoadData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && workLoadData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default WorkLoadTable;
