// import "./style.scss"
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Errordiv from "../../../widgets/alert/errordiv";
import TableSkeleton from "../../../widgets/skeleton/table";
import { formattedDateNew } from "../../../lib/timestampConverter";
import './style.scss';
type Props = {
  attendancedata: any;
  attTableHeader: any;
  apiStatus: string;
};

const TeacherAttendanceTable = (props: Props) => {
  let setAcronym = [];
  const PLEA = ["P", "L", "E", "A"];
  const groupedAttendances: any = {};
  const [startIdx, setStartIdx] = useState(0);
  const [nextButtonDisplayed, setNextButtonDisplayed] = useState(false);
  const [backButtonDisplayed, setBackButtonDisplayed] = useState(false);

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

  const count7Header = [...props.attTableHeader.slice(startIdx, startIdx + 7)];

  useEffect(() => {
    setStartIdx(0);
    if (props.attTableHeader.length <= 7) {
      setNextButtonDisplayed(false);
      setBackButtonDisplayed(false);
    } else {
      setNextButtonDisplayed(true);
    }
  }, [props.attTableHeader, props.attendancedata]);

  const handleNextPrevious = (e: any) => {
    const btnText = e.target.innerText.trim();
    if (btnText === "Next") {
      if (startIdx + 7 < props.attTableHeader.length) {
        setStartIdx(startIdx + 7);
        setBackButtonDisplayed(true);
      }
    }
    if (btnText === "Previous") {
      if (startIdx - 7 >= 0) {
        setStartIdx(startIdx - 7);
      }
      if (startIdx <= 7) {
        setBackButtonDisplayed(false);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex gap-2 justify-content-end my-3">
        {/* {backButtonDisplayed && ( */}
        <Button
           variant={!nextButtonDisplayed ? "secondary" : "primary"}
          disabled={!backButtonDisplayed}
          onClick={handleNextPrevious}
        >
          <i className="bi bi-arrow-left-circle"></i> Previous
        </Button>
        {/* )} */}
        {/* {nextButtonDisplayed && ( */}
        <Button
           variant={!nextButtonDisplayed ? "secondary" : "primary"}
          disabled={!nextButtonDisplayed}
          onClick={handleNextPrevious}
        >
          Next <i className="bi bi-arrow-right-circle"></i>
        </Button>
        {/* )} */}
      </div>
      <div className="table-responsive admin-table-wrapper mt-3">
        <Table bordered striped className="attandence-table">
          <thead>
            <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>P L E A</th>
            <th>Points</th>
            <th>Percentage</th>
            {count7Header.length > 0 &&
              count7Header.map((header: any, index: number) => (
                <th key={index}>{formattedDateNew(header)}</th>
              ))}
            </tr>
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
                      {count7Header.map((header: any, index: number) => (
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
        {props.apiStatus === "finished" &&
          props.attendancedata.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
      </div>
    </React.Fragment>
  );
};

export default TeacherAttendanceTable;
