import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";

const TimesSlotTable = ({
  apiStatus,
  departmentList,
}: any) => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Department Name",
      accessor: "name",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <Link to={`/managetimeslot/${row.original.id}/${(row.original.name).toLowerCase()}`}>View Time Slot</Link>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => departmentList, [departmentList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

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
