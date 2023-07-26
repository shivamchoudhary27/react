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
    Header: "Assessment in %",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "Average Assessment",
    // accessor: "value",
    Cell: ({ row }: any) => <SelectCell name="" />,
  },
  {
    Header: "Target Set",
    accessor: "targetSet",
  },
  {
    Header: "Attainment Level",
    accessor: "attainmentLevel",
  },
];

const AttainmentTable = (props: Props) => {
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

export default AttainmentTable;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
    targetSet: 60,
    attainmentLevel: 3,
  },
  {
    courseOutcomes: "AIT_CO 2",
    targetSet: 60,
    attainmentLevel: 3,
  },
  {
    courseOutcomes: "AIT_CO 3",
    targetSet: 60,
    attainmentLevel: 3,
  },
];
