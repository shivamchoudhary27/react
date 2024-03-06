import React from "react";
import Header from "../newHeader";
import HeaderTabs from "../headerTabs";
import PageTitle from "../../widgets/pageTitle";
import Errordiv from "../../widgets/alert/errordiv";
import TableSkeleton from "../../widgets/skeleton/table";
import { Button, Table, Container } from "react-bootstrap";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import EnrollIcon from "../../assets/images/icons/enrolluser.svg";
import EnrolledIcon from "../../assets/images/icons/enrolleduser.svg";
import WaitListIcon from "../../assets/images/icons/waitlistuser.svg";

type Props = {
  apiStatus: string;
  minorCourseData: any;
  toggleModalShow: any;
  setMoodalHeading: any;
};

const UserWaitlistData = (props: Props) => {

//   const handleEnrollClick = (e:any) => {
//     // console.log(e.target.value)
//     props.setMoodalHeading(e.target.value)
//     props.toggleModalShow(true)
//   }
  return (
    <>
        <Header />
        <HeaderTabs activeTab="helpdesk" />
        <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Minor Courses", path: "" },
          { name: "UserwaitListData", path: "" },
        ]}
        
      />
       <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
       <PageTitle pageTitle="User wait list data" gobacklink="/minorcourse" />
      <div className="table-responsive admin-table-wrapper grey-table-lines mt-3">
      <Table bordered striped className="attandence-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Total Seats</th>
            <th>Remaining Seats</th>
            <th>Actions</th> */}
          </tr>
        </thead>
        {/* <tbody>
          {props.minorCourseData.length > 0 &&
            props.minorCourseData.map((program: any, programIndex: number) => (
              <React.Fragment key={programIndex}>
                {program.programDtos &&
                  program.programDtos.length > 0 &&
                  program.programDtos.map(
                    (programDto: any, index: number) =>
                      programDto.categoriesCoursesDtos &&
                      programDto.categoriesCoursesDtos.length > 0 &&
                      programDto.categoriesCoursesDtos.map(
                        (category: any, categoryIndex: number) => (
                          <tr key={`${programIndex}_${index}_${categoryIndex}`}>
                            {categoryIndex === 0 && (
                              <td
                                rowSpan={programDto.categoriesCoursesDtos.length}
                                className="m-4"
                              >
                                {programDto.name}
                              </td>
                            )}

                            {category.courseDtos.length > 0 && (
                              <>
                                <td>{category.name}</td>
                                <td>
                                  {category.courseDtos.length > 0 &&
                                    category.courseDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.name}
                                      </div>
                                    ))}
                                </td>
                                <td>
                                  {category.courseDtos.length > 0 &&
                                    category.courseDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.enrollmentCapacity}
                                      </div>
                                    ))}
                                </td>
                                <td>
                                  {category.courseDtos.length > 0 &&
                                    category.courseDtos.map((course: any) => (
                                      <div className="m-4" key={course.id}>
                                        {course.remainingSeats}
                                      </div>
                                    ))}
                                </td>
                                <td>
                                  {category.courseDtos.length > 0 &&
                                    category.courseDtos.map((course: any) => (
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
                                            Waitlist
                                          </Button>
                                        ) : (
                                          <Button className="enroll-btn" key={course.id} value={course.name} onClick={(e)=>handleEnrollClick(e)}>
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
        </tbody> */}
      </Table>
      {props.apiStatus === "started" && props.minorCourseData.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {props.apiStatus === "finished" && props.minorCourseData.length === 0 && (
        <Errordiv msg="No record found!" cstate className="mt-3" />
      )}
    </div>
    </Container>
    </div>
    </div>
    </>
  );
};

export default UserWaitlistData;