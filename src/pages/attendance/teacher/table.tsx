import React from "react";
import { Table } from "react-bootstrap";
import Errordiv from "../../../widgets/alert/errordiv";
import TableSkeleton from "../../../widgets/skeleton/table";
import { formattedDateNew } from "../../../lib/timestampConverter";
// import "./style.scss"

type Props = {
  attendancedata: any;
  attTableHeader: any;
  apiStatus: string;
};

const TeacherAttendanceTable = (props: Props) => {
  let setAcronym = [];
  const PLEA = ["P", "L", "E", "A"];
  const groupedAttendances: any = {};

  if (props.attendancedata.length > 0) {
    props.attendancedata.forEach((user: any) => {
      const userAttendanceData: any = {};

      user.sessiondata.forEach((attendance: { sessdate: any }) => {
        const sessdate = attendance.sessdate;

        if (!userAttendanceData[sessdate]) {
          userAttendanceData[sessdate] = [];
        }

        userAttendanceData[sessdate].push(attendance);
      });

      groupedAttendances[user.userid] = userAttendanceData;
    });
  }

  return (
    <div className="table-responsive admin-table-wrapper mt-3">
      <Table bordered striped className="attandence-table">
        <thead style={{ backgroundColor: "blue" }}>
          <th>Full Name</th>
          <th>Email</th>
          <th>P L E A</th>
          <th>Points</th>
          <th>Percentage</th>
          {props.attTableHeader.length > 0 &&
            props.attTableHeader.map((header: any, index: number) => (
              <th key={index}>{formattedDateNew(header)}</th>
            ))}
        </thead>
        <tbody>
          {props.attendancedata.length > 0 &&
            props.attendancedata.map((user: any, index: number) => (
              <React.Fragment>
                <tr key={index}>
                  <td rowSpan={user.rowspan + 1}>
                    {user.firstname + " " + user.lastname}
                  </td>
                  <td rowSpan={user.rowspan + 1}>{user.email}</td>
                  <td rowSpan={user.rowspan + 1}>
                    {PLEA.map((el) =>
                      el in user.acronymcount ? user.acronymcount[el] : 0
                    )}
                  </td>
                  <td rowSpan={user.rowspan + 1}>46</td>
                  <td rowSpan={user.rowspan + 1}>46%</td>
                </tr>
                {[...Array(user.rowspan)].map((_, index: number) => (
                  <tr key={index}>
                    {props.attTableHeader.map((header: any, index: number) => (
                      <td key={index}>
                        {header in groupedAttendances[user.userid]
                          ? groupedAttendances[user.userid][header] &&
                            (setAcronym =
                              groupedAttendances[user.userid][header].shift())
                            ? setAcronym["acronym"]
                            : "-"
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
        </tbody>
      </Table>

      {props.apiStatus === "started" && props.attendancedata.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {props.apiStatus === "finished" && props.attendancedata.length === 0 && (
        <Errordiv msg="No record found!" cstate className="mt-3" />
      )}
    </div>
  );
};

export default TeacherAttendanceTable;
