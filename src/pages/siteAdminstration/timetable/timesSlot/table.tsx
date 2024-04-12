import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { PiArrowsDownUpBold } from "react-icons/pi";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";


const TimesSlotTable = ({
  apiStatus,
  departmentList,
  setWeekendSlotObj,
  toggleModalShow,
  filterUpdate,
  setFilterUpdate
}: any) => {

  // call global function handleTableSorting
  const { handleTableSorting } = useTableSorting();

  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: (
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleTableSorting("name", setFilterUpdate)}
          >
           <span> Department Name </span>
          <span>
            {filterUpdate.sortBy === "name" &&
            filterUpdate.sortOrder === "asc" ? (
              <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Department Name Ascending </BsTooltip>}
                >
                  <button className="btn btn-link text-white p-0">
                    <TbSortAscending />
                    </button>
                </OverlayTrigger>
              ) : filterUpdate.sortBy === "name" &&
              filterUpdate.sortOrder === "desc" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sorted by Department Name Descending </BsTooltip>}
                ><button className="btn btn-link text-white p-0">
                <TbSortDescending />
                </button>
                </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip>Sort by Department Name Ascending </BsTooltip>}
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
      accessor: "name",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <div className="d-flex gap-3 managetime-actionbtns">
          <Link
            to={`/managetimeslot/${
              row.original.id
            }/${row.original.name.toLowerCase()}`}
            className="action-icons"
          >
            View Timeslot
          </Link>
          <Link
            to=""
            className="action-icons"
            onClick={() =>
              setDepartmentWeekend({
                id: row.original.id
              })
            }
          >
            View Weekend
          </Link>
        </div>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => departmentList, [departmentList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const setDepartmentWeekend = ({id }: any) => {
    toggleModalShow(true);
    setWeekendSlotObj({ id: id });
  };

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
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
        {apiStatus === "started" && departmentList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && departmentList.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default TimesSlotTable;
