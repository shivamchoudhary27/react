import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table} from "react-bootstrap";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import CounterCell from "../counterCell";

type Props = {};

const tableColumn = [
  {
    Header: "Course Outcomes",
    accessor: "courseOutcomes",
  },
  {
    Header: "PO1",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO2",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO3",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO4",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO5",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO6",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO7",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO8",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO9",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO10",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO11",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PO12",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PSO1",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
  {
    Header: "PSO2",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <CounterCell rowValue={row.original.value} />
    ),
  },
];

const MappingTable = (props: Props) => {
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

export default MappingTable;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
  },
  {
    courseOutcomes: "AIT_CO 2",
  },
  {
    courseOutcomes: "AIT_CO 3",
  },
];
