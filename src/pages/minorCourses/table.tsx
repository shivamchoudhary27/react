import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import Errordiv from "../../widgets/alert/errordiv";
import TableSkeleton from "../../widgets/skeleton/table";
import TimerAlertBox from "../../widgets/alert/timerAlert";
import EnrolledIcon from "../../assets/images/icons/enrolleduser.svg";
import EnrollIcon from "../../assets/images/icons/enrolluser.svg";
import WaitListIcon from "../../assets/images/icons/waitlistuser.svg";


type Props = {
  apiStatus: string;
  minorCourseData: any;
  toggleModalShow: any;
};

const StudentMinorCourseTable = (props: Props) => {

  return (
    <div className="table-responsive admin-table-wrapper grey-table-lines mt-3">
      <Table bordered striped className="attandence-table">
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Blocks</th>
            <th>Courses</th>
            <th>Total Seats</th>
            <th>Remaining Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.minorCourseData.length > 0 &&
            props.minorCourseData.map((program: any, programIndex: number) => (
              <React.Fragment key={programIndex}>
                {program.categories &&
                  program.categories.length > 0 ? (
                  program.categories.map(
                    (category: any, categoryIndex: number) => (
                      <tr key={`${programIndex}_${categoryIndex}`}>
                        {categoryIndex === 0 && (
                          <td rowSpan={program.categories.length}>
                            {program.name}
                          </td>
                        )}
                        <td>{category.name}</td>
                        <td>
                          {category.courses && category.courses.length > 0
                            ? category.courses.map((course: any) => (
                                <div key={course.id}>{course.name}</div>
                              ))
                            : ""}
                        </td>
                        <td>60</td>
                        <td>40</td>
                        <td>
                          <Link to="#" className="action-icons small-icon">
                            Enrolled
                          </Link>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  // Render a row with only the program name if categories are empty
                  <tr key={`${programIndex}`}>
                    <td>{program.name}</td>
                    <td></td>
                    <td></td>
                    <td>60</td>
                    <td>40</td>
                    <td>

                    {/* ---- enrolled ---- */}
                      <Button
                      className="enrolled-btn"
                      >
                        <img src={EnrolledIcon} alt="Enroll" />
                        Enrolled
                      </Button>

                    {/* ---- Enroll me ---- */}
                      {/* <Button
                      className="enroll-btn"
                      >
                        <img src={EnrollIcon} alt="Enroll" />
                       Enroll me
                      </Button> */}

                    {/* ---- Waitlist ---- */}
                      {/* <Button
                      className="waitlist-btn"
                      >
                        <img src={WaitListIcon} alt="Enroll" />
                        waitlist
                      </Button> */}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </Table>
      {props.apiStatus === "started" && props.minorCourseData.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {props.apiStatus === "finished" && props.minorCourseData.length === 0 && (
        <Errordiv msg="No record found!" cstate className="mt-3" />
      )}
    </div>
  );
};

export default StudentMinorCourseTable;
