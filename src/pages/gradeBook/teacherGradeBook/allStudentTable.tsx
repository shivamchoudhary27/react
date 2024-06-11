import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import BuildPagination from "../../../widgets/pagination";

type Props = {
  apiStatus?: string;
  courseName?: string;
  coursesList?:any;
  courseApiStatus: string;
  courseId?: number;
  studentId?: number;
  StudentData: {
    user: {
      id: string;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
    };
    finalgrade: string;
  }[];
};

const AllStudentTable = ({
  apiStatus,
  StudentData,
  courseId,
  studentId,
  courseName,
  courseApiStatus,
  coursesList,
}: Props) => {
  const [studentList, setStudentList] = useState<typeof StudentData>([]);
  useEffect(() => {
    setStudentList(StudentData);
  }, [StudentData]);
  useEffect(() => {
    const filteredUser = StudentData.filter(
      (user) => user.user.id === studentId.toString()
    );
    if (studentId > 0) {
      setStudentList(filteredUser);
    } else {
      setStudentList(StudentData);
    }
  }, [studentId, StudentData]);

  const tableColumns = useMemo(
    () => [
      { Header: "SN.", accessor: (_row: any, index: number) => index + 1 },
      {
        Header: "Firstname/Surname",
        accessor: (row: any) => `${row.user.firstname} ${row.user.lastname}`,
      },
      {
        Header: "Email address",
        accessor: "user.email",
      },
      {
        Header: "Course Total",
        accessor: (row: any) => {
          const finalGrade = +row.finalgrade; // Convert to number
          return isNaN(finalGrade) ? 0 : finalGrade.toFixed(2);
        },
      },
      {
        Header: "Details",
        Cell: ({ row }: any) => (
          <Link
            to={`/studentgradeview/${courseId}/${row.original.user.id}/${courseName}/`}
          >
            View
          </Link>
        ),
      },
    ],
    [courseId, courseName]
  );

  const data = useMemo(() => studentList, [studentList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data,
    });

  return (
    <React.Fragment>
    {/* <div className="table-responsive table-wrapper mt-3 mygradebook"> */}
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
      {(apiStatus === "started" && studentList.length === 0) ||
        (courseApiStatus === "started" && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          ))}
      {(apiStatus === "finished" && studentList.length === 0)  && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
    </div>
    </React.Fragment>
  );
};

export default AllStudentTable;
