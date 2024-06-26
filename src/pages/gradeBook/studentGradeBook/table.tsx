import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import Errordiv from "../../../widgets/alert/errordiv";
import TableSkeleton from "../../../widgets/skeleton/table";
import React, { useMemo, useState, useEffect } from "react";

type Props = {
  gradebookData?: any[];
  apiStatus: string;
  currentUserRole: any;
  courseApiStatus: string;
  statusfilter: any;
  coursesList: any;
};

const GradeTable = ({
  apiStatus,
  currentUserRole,
  statusfilter,
  gradebookData,
  coursesList,
  courseApiStatus,
}: Props) => {
  const [gradebookObj, setgradebookObj] = useState<any>([]);

  useEffect(() => {
    const getSlicedData = gradebookData.slice(1);
    const strippedPacket = getSlicedData.filter((item) => {
      for (const key in item) {
        if (Array.isArray(item[key]) && item[key].length === 0) {
          return false;
        } else {
          return true;
        }
      }
    });

    // Apply additional filtering based on statusfilter
    const filteredData = strippedPacket.filter((item) => {
      if (item.hasOwnProperty("contributiontocoursetotal")) {
        if (statusfilter === "inprogress") {
          return (
            parseFloat(item.contributiontocoursetotal.content) > 0 &&
            parseFloat(item.contributiontocoursetotal.content) < 100
          );
        } else if (statusfilter === "completed") {
          return (
            parseFloat(item.contributiontocoursetotal.content) === 100 ||
            item.contributiontocoursetotal.content === "-"
          );
        } else if (statusfilter === "notstarted") {
          return parseFloat(item.contributiontocoursetotal.content) === 0;
        }
      }
      return true;
    });

    setgradebookObj(filteredData);
  }, [gradebookData, currentUserRole, statusfilter]);

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
        const itemname = row.original.itemname;
        return itemname && itemname.content ? (
          <div dangerouslySetInnerHTML={{ __html: itemname.content }} />
        ) : null;
      },
    },
    {
      Header: "Calculated weight",
      Cell: ({ row }: any) => {
        const weight = row.original.weight;
        return weight && weight.content ? (
          <div dangerouslySetInnerHTML={{ __html: weight.content }} />
        ) : null;
      },
    },
    {
      Header: "Grade",
      Cell: ({ row }: any) => {
        const grade = row.original.grade;
        return grade && grade.content ? (
          <div dangerouslySetInnerHTML={{ __html: grade.content }} />
        ) : null;
      },
    },
    {
      Header: "Range",
      Cell: ({ row }: any) => {
        const range = row.original.range;
        return range && range.content ? (
          <div dangerouslySetInnerHTML={{ __html: range.content }} />
        ) : null;
      },
    },
    {
      Header: "Percentage",
      Cell: ({ row }: any) => {
        const percentage = row.original.percentage;
        return percentage && percentage.content ? (
          <div dangerouslySetInnerHTML={{ __html: percentage.content }} />
        ) : null;
      },
    },
    {
      Header: "Feedback",
      Cell: ({ row }: any) => {
        const feedback = row.original.feedback;
        return feedback && feedback.content ? (
          <div dangerouslySetInnerHTML={{ __html: feedback.content }} />
        ) : null;
      },
    },
    {
      Header: "Contribution to course total",
      Cell: ({ row }: any) => {
        const contributiontocoursetotal =
          row.original.contributiontocoursetotal;
        return contributiontocoursetotal &&
          contributiontocoursetotal.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: contributiontocoursetotal.content,
            }}
          />
        ) : null;
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
      <div className="table-responsive table-wrapper mt-3 mygradebook mb-2">
        <Table borderless striped {...getTableProps} className="mb-0">
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
      </div>
      {/* {(apiStatus === "started" && gradebookObj.length === 0) ||
        (courseApiStatus === "started" && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        ))}
      {(apiStatus === "finished" && gradebookObj.length === 0) ||
        (courseApiStatus === "finished" && coursesList.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        ))} */}

      {apiStatus === "started" && gradebookObj.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {apiStatus === "finished" && gradebookObj.length === 0 && (
        <Errordiv msg="No record found!" cstate className="mt-3" />
      )}
    </React.Fragment>
  );
};

export default GradeTable;
