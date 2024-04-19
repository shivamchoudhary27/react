import { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import { OverlayTrigger, Table, Tooltip as BsTooltip } from "react-bootstrap";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { useTableSorting } from "../../../../globals/TableFilterShorting/TableFieldShorting";
import { isMobile } from 'react-device-detect';
import gearIcon from "../../../../assets/images/icons/setting-action.svg";


const ProgramEnrollTable = ({ 
  enrollmentData, 
  apiStatus,
  setFilterUpdate,
  filterUpdate, }: any) => {

const { handleTableSorting } = useTableSorting();

const triggerType = isMobile ? 'focus' : 'hover';

const tableColumn = [
  {
    Header: (
      <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("name", setFilterUpdate)}
        >
         <span> Name </span>
        <span>
          {filterUpdate.sortBy === "name" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Name Ascending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0">
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "name" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Name Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0">
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Name Ascending </BsTooltip>}
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
    Header: (
      <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("batchYear", setFilterUpdate)}
        >
         <span> Batch Year </span>
        <span>
          {filterUpdate.sortBy === "batchYear" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Batch Year Ascending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0">
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "batchYear" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Batch Year Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0">
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Batch Year Ascending </BsTooltip>}
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
    accessor: "batchYear",
  },
  {

    Header: (
      <div className="d-flex align-items-center">
        <span
          onClick={() => handleTableSorting("programCode", setFilterUpdate)}
        >
         <span> Program Code </span>
        <span>
          {filterUpdate.sortBy === "programCode" &&
          filterUpdate.sortOrder === "asc" ? (
            <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Program Code Ascending </BsTooltip>}
              >
                <button className="btn btn-link text-white p-0">
                  <TbSortAscending />
                  </button>
              </OverlayTrigger>
            ) : filterUpdate.sortBy === "programCode" &&
            filterUpdate.sortOrder === "desc" ? (
              <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sorted by Program Code Descending </BsTooltip>}
              ><button className="btn btn-link text-white p-0">
              <TbSortDescending />
              </button>
              </OverlayTrigger>
              ) : (
                <OverlayTrigger
                placement="top"
                overlay={<BsTooltip>Sort by Program Code Ascending </BsTooltip>}
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
      accessor: "programCode",
    Cell: ({ value }: any) => value.toUpperCase(),
  },
  {
    Header: "Action",
    accessor: "manage_users",
    Cell: ({ row }: any) => (
      <OverlayTrigger
      placement="top"
      overlay={<BsTooltip>Show Courses</BsTooltip>}
      trigger={triggerType}
     >
     <Link className="action-icons"
      to={`/copoCourse/${row.original.id}/${row.original.name}`}
      >
        <img
   style={{ cursor: "pointer" }}
   src={gearIcon}
   alt="Setting"
 />
      </Link>
      </OverlayTrigger>
    ),
  },
];

  const columns = useMemo(() => tableColumn, [filterUpdate]);
  const data = useMemo(() => enrollmentData, [enrollmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <>
      <div className="table-responsive admin-table-wrapper mt-3">
        <Table borderless striped {...getTableProps()}>
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
          <tbody {...getTableBodyProps()}>
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
        {apiStatus === "started" && enrollmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && enrollmentData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </>
  );
};

export default ProgramEnrollTable;
