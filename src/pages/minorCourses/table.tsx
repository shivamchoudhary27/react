import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Errordiv from "../../widgets/alert/errordiv";
import TableSkeleton from "../../widgets/skeleton/table";
import EnrollIcon from "../../assets/images/icons/enrolluser.svg";
import EnrolledIcon from "../../assets/images/icons/enrolleduser.svg";
import WaitListIcon from "../../assets/images/icons/waitlistuser.svg";
import { ImCross } from "react-icons/im";

type Props = {
  apiStatus: string;
  minorCourseData: any;
  toggleModalShow: any;
  editHandlerById: any;
  refreshToggle: any;
  updateAddRefresh: any;
};

const StudentMinorCourseTable = (props: Props) => {
  const navigate = useNavigate();

  const handleEnrollClick = (
    id: number,
    name: string,
    enrolmentStatus: string
  ) => {
    props.editHandlerById(id, name, enrolmentStatus);
    props.toggleModalShow(true);
  };

  const handleWaitlistClick = (
    id: number,
    name: string,
    remainingSeats: number,
    enrollmentCapacity: number,
    enrolmentStatus: string
  ) => {
    props.editHandlerById(
      id,
      name,
      remainingSeats,
      enrollmentCapacity,
      enrolmentStatus
    );
    props.toggleModalShow(true);
  };

  const unenrolledOnClick = (id: number, name: string, remainingSeats: number, enrollmentCapacity: number) => {
    props.editHandlerById(id, name, remainingSeats, enrollmentCapacity);
    props.toggleModalShow(true);
  };

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
          {props.minorCourseData.map((program: any, programIndex: number) => (
            <React.Fragment key={programIndex}>
              {program.categories &&
                program.categories.map(
                  (category: any, categoryIndex: number) => (
                    <tr key={`${programIndex}_${categoryIndex}`}>
                      {categoryIndex === 0 && (
                        <td rowSpan={program.categories.length}>
                          {program.name}
                        </td>
                      )}

                      {category.courses?.length > 0 && (
                        <>
                          <td>{category.name}</td>
                          <td>
                            {category.courses.map((course: any) => (
                              <div className="m-4" key={course.id}>
                                {course.name}
                              </div>
                            ))}
                          </td>
                          <td>
                            {category.courses.map((course: any) => (
                              <div className="m-4" key={course.id}>
                                {course.enrollmentCapacity}
                              </div>
                            ))}
                          </td>
                          <td>
                            {category.courses.map((course: any) => (
                              <div className="m-4" key={course.id}>
                                {course.remainingSeats}
                              </div>
                            ))}
                          </td>
                          <td>
                            {category.courses.map((course: any) => (
                              <div className="m-4" key={course.id}>
                                {
                                course.enrolmentStatus === "enrolment_open"  ? (
                                  <Button
                                  className="enroll-btn"
                                  onClick={() =>
                                    handleEnrollClick(
                                      course.id,
                                      course.name,
                                      course.enrolmentStatus
                                    )
                                  }
                                >
                                  <img src={EnrollIcon} alt="Enroll" />
                                  Enroll
                                </Button>
                                ) : 
                                  course.remainingSeats === 0 &&
                                  course.enrolmentStatus ===
                                    "enrolment_open" ? (
                                  <Button
                                    className="waitlist-btn"
                                    onClick={() =>
                                      handleWaitlistClick(
                                        course.id,
                                        course.name,
                                        course.remainingSeats,
                                        course.enrollmentCapacity,
                                        course.enrolmentStatus
                                      )
                                    }
                                  >
                                    <img src={WaitListIcon} alt="Enroll" />
                                    Waitlist
                                  </Button>
                                ) : course.enrolmentStatus !== "enrolment_open" ? (
                                  <>
                                    {" "}
                                    <Button
                                      // className="waitlist-btn"
                                      className="enrolled-btn"
                                      onClick={() =>
                                        handleWaitlistClick(
                                          course.id,
                                          course.name,
                                          course.remainingSeats,
                                          course.enrollmentCapacity,
                                          course.enrolmentStatus
                                        )
                                      }
                                    >
                                      <img src={WaitListIcon} alt="Enroll" />
                                      Waitlisted
                                    </Button> &nbsp;&nbsp;
                                    <span style={{color:"red"}}><ImCross /></span>
                                  </>
                                ) : null
                                }
                              </div>
                            ))}
                          </td>
                        </>
                      )}
                    </tr>
                  )
                )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      {props.apiStatus === "started" && props.minorCourseData?.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {props.apiStatus === "finished" &&
        props.minorCourseData?.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
    </div>
  );
};

export default StudentMinorCourseTable;
