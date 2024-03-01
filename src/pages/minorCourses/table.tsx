import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import React from "react";
import Errordiv from "../../widgets/alert/errordiv";
import TableSkeleton from "../../widgets/skeleton/table";
import EnrollIcon from "../../assets/images/icons/enrolluser.svg";
import EnrolledIcon from "../../assets/images/icons/enrolleduser.svg";
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
                {program.programDtos &&
                  program.programDtos.length > 0 &&
                  program.programDtos.map(
                    (programDto: any, index: number) =>
                      programDto.categories &&
                      programDto.categories.length > 0 &&
                      programDto.categories.map(
                        (category: any, categoryIndex: number) => (
                          <tr key={`${programIndex}_${index}_${categoryIndex}`}>
                            {categoryIndex === 0 && (
                              <td
                                rowSpan={programDto.categories.length}
                                className="m-4"
                              >
                                {programDto.name}
                              </td>
                            )}

                            {category.coursesDtos.length > 0 && (
                              <>
                                <td>{category.name}</td>
                                <td>
                                  {category.coursesDtos.length > 0 &&
                                    category.coursesDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.name}
                                      </div>
                                    ))}
                                </td>
                                <td>
                                  {category.coursesDtos.length > 0 &&
                                    category.coursesDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.enrollmentCapacity}
                                      </div>
                                    ))}
                                </td>
                                <td>
                                  {category.coursesDtos.length > 0 &&
                                    category.coursesDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.remainingSeats}
                                      </div>
                                    ))}
                                </td>
                                <td>
                                  {category.coursesDtos.length > 0 &&
                                    category.coursesDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.enrolled ? (
                                          <Button className="enrolled-btn">
                                            <img
                                              src={EnrolledIcon}
                                              alt="Enroll"
                                            />
                                            Unenrolled
                                          </Button>
                                        ) : course.remainingSeats === 0 ? (
                                          <Button className="waitlist-btn">
                                            <img
                                              src={WaitListIcon}
                                              alt="Enroll"
                                            />
                                            waitlist
                                          </Button>
                                        ) : (
                                          <Button className="enroll-btn">
                                            <img
                                              src={EnrollIcon}
                                              alt="Enroll"
                                            />
                                            Enroll
                                          </Button>
                                        )}
                                      </div>
                                    ))}
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      )
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
