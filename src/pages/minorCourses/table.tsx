import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  OverlayTrigger,
  Tooltip as BsTooltip,
} from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import Errordiv from "../../widgets/alert/errordiv";
import TableSkeleton from "../../widgets/skeleton/table";
import EnrollIcon from "../../assets/images/icons/enrolluser.svg";
import EnrolledIcon from "../../assets/images/icons/enrolleduser.svg";
import WaitListIcon from "../../assets/images/icons/waitlistuser.svg";

type Props = {
  apiStatus: string;
  minorCourseData: any;
  toggleModalShow: any;
  editHandlerById: any;
  refreshToggle: any;
  updateAddRefresh: any;
  isEnrolled: any;
  isWaitlisted: any;
};

const StudentMinorCourseTable = (props: Props) => {
  const handleEnrollClick = (
    id: number,
    name: string,
    remainingSeats: number,
    enrollmentCapacity: number,
    enrolmentStatus: string,
    roll: string
  ) => {
    props.editHandlerById(
      id,
      name,
      remainingSeats,
      enrollmentCapacity,
      enrolmentStatus,
      roll
    );
    props.toggleModalShow(true);
  };

  const handleRemoveClick = (
    id: number,
    name: string,
    remainingSeats: number,
    enrollmentCapacity: number,
    enrolmentStatus: string,
    roll: string
  ) => {
    props.editHandlerById(
      id,
      name,
      remainingSeats,
      enrollmentCapacity,
      enrolmentStatus,
      roll
    );
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

  const handleUnenrollClick = (
    id: number,
    name: string,
    selfUnEnrolmentAllowed: boolean
  ) => {
    props.editHandlerById(id, name, selfUnEnrolmentAllowed);
    props.toggleModalShow(true);
  };

  return (
    <>
      <div className="admin-table-wrapper grey-table-lines mt-3">
        <Table bordered striped responsive className="attandence-table">
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
                            <td>
                              <div className="year-block">
                                {category.name}
                                <div className="enrolmentrequired-tag">
                                  {` Enrollment required in ${
                                    category.maxMinorCoursesAllowed
                                  } course${
                                    category.maxMinorCoursesAllowed > 1
                                      ? "s"
                                      : ""
                                  }`}
                                </div>
                              </div>
                            </td>
                            <td>
                              {category.courses.map((course: any) => (
                                <div className="m-3" key={course.id}>
                                  {course.name}
                                </div>
                              ))}
                            </td>
                            <td>
                              {category.courses.map((course: any) => (
                                <div className="m-3" key={course.id}>
                                  {course.enrollmentCapacity}
                                </div>
                              ))}
                            </td>
                            <td>
                              {category.courses.map((course: any) => (
                                <div className="m-3" key={course.id}>
                                  {course.remainingSeats}
                                </div>
                              ))}
                            </td>
                            <td>
                              {category.courses.map((course: any) => (
                                <div
                                  className="m-3 mcaction-btns"
                                  key={course.id}
                                >
                                  {props.isEnrolled(course.id) ? (
                                    <>
                                      <Button
                                        className="enrolled-btn"
                                        style={{ cursor: "auto" }}
                                      >
                                        <img
                                          src={EnrolledIcon}
                                          alt="Enrolled"
                                        />
                                        Enrolled
                                        {course.selfUnEnrolmentAllowed === true && (
                                        <button
                                          className="remove-waitlist"
                                          style={{
                                            color: "red",
                                          }}
                                          title="Unenroll"
                                          onClick={() =>
                                            handleUnenrollClick(
                                              course.id,
                                              course.name,
                                              course.selfUnEnrolmentAllowed
                                            )
                                          }
                                        >
                                          X
                                        </button>
                                      )}
                                      </Button>
                                    </>
                                  ) : props.isWaitlisted(course.id) ? (
                                    <>
                                      <Button
                                        className="enrolled-btn waitlisted-btn"
                                        style={{ cursor: "auto" }}
                                      >
                                        <img
                                          src={WaitListIcon}
                                          alt="Waitlist"
                                        />
                                        Waitlisted
                                        <button
                                          className="remove-waitlist"
                                          style={{
                                            color: "red",
                                          }}
                                          title="Remove from Waitlist"
                                          onClick={() =>
                                            handleRemoveClick(
                                              course.id,
                                              course.name,
                                              course.remainingSeats,
                                              course.enrollmentCapacity,
                                              course.enrolmentStatus,
                                              "remove"
                                            )
                                          }
                                        >
                                          X
                                        </button>
                                        {/* tooltip in btn */}
                                      </Button>
                                      {/* <Button
                                        className="enroll-btn"
                                        style={{
                                          background: "#CD5C5C",
                                        }}
                                        onClick={() =>
                                          handleRemoveClick(
                                            course.id,
                                            course.name,
                                            course.remainingSeats,
                                            course.enrollmentCapacity,
                                            course.enrolmentStatus,
                                            "remove"
                                          )
                                        }
                                      >
                                        <img
                                          src={WaitListIcon}
                                          alt="Waitlist"
                                        />
                                        Remove from Waitlist
                                      </Button> */}
                                    </>
                                  ) : course.enrolmentStatus ===
                                    "waitlist_open" ? (
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
                                      <img src={EnrollIcon} alt="Enroll" />
                                      Add to Waitlist
                                    </Button>
                                  ) :  course.enrolmentStatus === "enrolment_waiting" ? (
                                    <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <BsTooltip id="button-tooltip-2">
                                       {course.enrolmentWaitingInfo}
                                      </BsTooltip>
                                    }
                                    >
                                    <Button
                                    className="enrolled-btn"
                                    >
                                    <RxCrossCircled />
                                    &nbsp;Enroll
                                    </Button>
                                    </OverlayTrigger> 
                                  ) : 
                                  <Button
                                        className="enroll-btn"
                                        onClick={() =>
                                          handleEnrollClick(
                                            course.id,
                                            course.name,
                                            course.remainingSeats,
                                            course.enrollmentCapacity,
                                            course.enrolmentStatus,
                                            "enroll"
                                          )
                                        }
                                      >
                                        <img src={EnrollIcon} alt="Enroll" />
                                        Enroll Me
                                      </Button>}
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
      </div>
      {props.apiStatus === "started" && props.minorCourseData?.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {props.apiStatus === "finished" &&
        props.minorCourseData?.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
    </>
  );
};

export default StudentMinorCourseTable;