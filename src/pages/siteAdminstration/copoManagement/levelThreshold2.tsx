import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table,} from "react-bootstrap";
import CustomButton from "../../../widgets/formInputFields/buttons";
import CounterCell from "./counterCell";

type Props = {};

const tableColumn = [
  {
    Header: "Course Outcomes",
    accessor: "courseOutcomes",
  },
  {
    Header: "Target Set(%)",
    accessor: "targetSet",
  },
  {
    Header: "Level 0 (Below)",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "Level 1 (Below and Above)",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "Level 2 (Between)",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "Level 3 (Above)",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
];

const LevelThreshold2 = (props: Props) => {
  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => tableData, [tableData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper copo-table mt-3">
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
        {/* {apiStatus === "started" && departmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && departmentData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )} */}
      </div>

      <div className="modal-buttons">
        <CustomButton
          type="submit"
          variant="primary"
          // isSubmitting={isSubmitting}
          btnText="Save & Continue"
        />{" "}
        <CustomButton
          type="reset"
          btnText="Reset"
          variant="outline-secondary"
        />
      </div>
    </React.Fragment>
  );
};

export default LevelThreshold2;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
    targetSet: 60
  },
  {
    courseOutcomes: "AIT_CO 2",
    targetSet: 60
  },
  {
    courseOutcomes: "AIT_CO 3",
    targetSet: 60
  },
];
