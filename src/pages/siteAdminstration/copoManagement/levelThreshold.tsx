import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import CustomButton from "../../../widgets/formInputFields/buttons";

type Props = {};

const tableColumn = [
  {
    Header: "SNo.",
    Cell: ({ row }: any) => <p>{row.index + 1}</p>,
  },
  {
    Header: "Course Outcomes",
    accessor: "courseOutcomes",
  },
  {
    Header: "After successful completion of the course student will be able to",
    accessor: "courseCompletion",
  },
  {
    Header: "Target Set(%)",
    // accessor: "value",
    Cell: ({ row }: any) => (
      <form>
        <ButtonGroup aria-label="Basic" size="sm" className="minusplus-btngroup">
          <Button variant="primary">
            <i className="fa-solid fa-minus"></i>
          </Button>
          <input
            type="text"
            value={row.original.value}
            onChange={(e) => {
              row.original.value = e.target.value;
            }}
            placeholder="0%"
            style={{ width: "70px" }}
          />
          <Button variant="primary">
            <i className="fa-solid fa-plus"></i>
          </Button>
        </ButtonGroup>
      </form>
    ),
  },
];

const LevelThreshold = (props: Props) => {
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

export default LevelThreshold;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
    courseCompletion: "Identify the user mashup in rich internet application",
  },
  {
    courseOutcomes: "AIT_CO 2",
    courseCompletion: "",
  },
  {
    courseOutcomes: "AIT_CO 3",
    courseCompletion: "",
  },
];
