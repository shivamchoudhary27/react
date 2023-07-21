import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import TableSkeleton from "../../widgets/skeleton/table";
import Errordiv from "../../widgets/alert/errordiv";

type Props = {
  gradebookData: any[];
  apiStatus: string;
};

const GradeTable = ({ gradebookData, apiStatus }: Props) => {
  const [gradebookObj, setgradebookObj] = useState<any>([]);

  useEffect(() => {
    const getSlicedData = gradebookData.slice(1);
    setgradebookObj(getSlicedData);
  }, [gradebookData]);

  const decodeHtmlEntities = (htmlString: any) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(
      `<!doctype html><body>${htmlString}`,
      "text/html"
    ).body.textContent;
    if (htmlString === "&nbsp;") {
      return "-";
    } else {
      return decodedString;
    }
  };

  const tableColumn = [
    {
      Header: "Grade item",
      Cell: ({ row }: any) => {
        console.log(
          decodeHtmlEntities(
            row.original.itemname !== undefined && row.original.itemname.content
          )
        );
        return decodeHtmlEntities(
          row.original.itemname !== undefined && row.original.itemname.content
        );
      },
    },
    {
      Header: "Calculated weight",
      Cell: ({ row }: any) => {
        return decodeHtmlEntities(
          row.original.weight !== undefined && row.original.weight.content
        );
      },
    },
    {
      Header: "Grade",
      Cell: ({ row }: any) => {
        return decodeHtmlEntities(
          row.original.grade !== undefined && row.original.grade.content
        );
      },
    },
    {
      Header: "Range",
      Cell: ({ row }: any) => {
        return decodeHtmlEntities(
          row.original.range !== undefined && row.original.range.content
        );
      },
    },
    {
      Header: "Percentage",
      Cell: ({ row }: any) => {
        return decodeHtmlEntities(
          row.original.percentage !== undefined &&
            row.original.percentage.content
        );
      },
    },
    {
      Header: "Feedback",
      Cell: ({ row }: any) => {
        return decodeHtmlEntities(
          row.original.feedback !== undefined && row.original.feedback.content
        );
      },
    },
    {
      Header: "Contribution to course total",
      Cell: ({ row }: any) => {
        return decodeHtmlEntities(
          row.original.contributiontocoursetotal !== undefined &&
            row.original.contributiontocoursetotal.content
        );
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => gradebookObj, [gradebookObj]);
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
        {apiStatus === "started" && gradebookObj.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && gradebookObj.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </React.Fragment>
  );
};

export default GradeTable;
