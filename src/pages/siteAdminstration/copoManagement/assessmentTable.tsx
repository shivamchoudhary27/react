import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import CustomButton from "../../../widgets/formInputFields/buttons";
import SelectCell from "./selectCell";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import AssessmentButtons from "./assessmentButtons";

type Props = {};

const tableColumn = [
  {
    Header: "Course Outcomes",
    accessor: "courseOutcomes",
  },
  {
    Header: "Test 1",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "Test 2",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "IA 1",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "IA 2",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "IA 3",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "LAB %",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "ESE %",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <div>
        <input type="text" value="100" style={{ width: "100px" }} />
      </div>
    ),
  },
  {
    Header: "Average Assessment",
    accessor: "average",
  },
];

const AssessmentTable = (props: Props) => {
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
        {/* {apiStatus === "started" && departmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && departmentData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )} */}
      </div>

      <AssessmentButtons />

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

export default AssessmentTable;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
    average: "88.86",
  },
  {
    courseOutcomes: "AIT_CO 2",
    average: "89.54",
  },
  {
    courseOutcomes: "AIT_CO 3",
    average: "78.63",
  },
];
