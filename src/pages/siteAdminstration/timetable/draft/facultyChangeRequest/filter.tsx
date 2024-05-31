import { useFormik } from "formik";
import { getMonthList } from "../local";
import { format, parse, getTime } from "date-fns";
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { renderCourse, handleChildrens, courseDatesObj } from "../utils";
import { makeGetDataRequest } from "../../../../../features/apiCalls/getdata";
import endDateIcon from "../../../../../../src/assets/images/icons/calender-enddate.svg";
import startDateIcon from "../../../../../../src/assets/images/icons/calender-startdate.svg";
const ManageFilter = ({
  courseDates,
  requestCount,
  workloadCourses,
  setCoursesStatus,
  updateCourseDates,
  changeFilterStatus,
  selectedCourse,
  setSelectedCourse,
  updateFacultyStatus,
  setHandleMonthFilter,
}: any) => {
  const initialValues = {
    name: "",
    faculty: "",
    workloadCourse: "",
  };
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [monthList, setMonthList] = useState([]);
  const [coursesOnly, setCoursesOnly] = useState<any>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<number>(0);
  const [courseFacultyData, setCourseFacultyData] = useState<any>(dummyData);

  useEffect(() => {
    if (coursesOnly.length === 0) setCoursesStatus(true);
    else setCoursesStatus(false);
  }, [coursesOnly]);

  useEffect(() => {
    if (workloadCourses.length > 0) {
      let collectCourses = workloadCourses.filter(
        (item: any) => item.coursename
      );
      setCoursesOnly(collectCourses);
    }
  }, [workloadCourses]);

  useEffect(() => {
    if (selectedCourse > 0) {
      makeGetDataRequest(
        `/course/${selectedCourse}/enrol-user`,
        { pageNumber: 0, pageSize: 100, teachersOnly: true },
        setCourseFacultyData
      );
    }
  }, [selectedCourse]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // console.log(values);
    },
    onReset: () => {
      setSelectedFaculty(0);
      setSelectedCourse(0);
      updateCourseDates(courseDatesObj);
    },
  });

  const handleCourseFilterChange = (e: any) => {
    setSelectedCourse(parseInt(e.target.value));
    setSelectedFaculty(0);
    handleCourseDates(parseInt(e.target.value));
  };

  const handleFacultyFilterChange = (e: any) => {
    setSelectedFaculty(parseInt(e.target.value));
    updateFacultyStatus(parseInt(e.target.value));
  };

  const handleCourseDates = (courseId: number) => {
    let startDate = "--/--/----",
      endDate = "--/--/----";
    let startDateTimeStamp,
      endDateTimeStamp = 0;
    let noneSelected = false;

    const courseWithId = coursesOnly.find(
      (item: any) => item.courseid === courseId
    );
    if (courseWithId) {
      startDate = format(new Date(courseWithId.startDate), "dd/MM/yyyy");
      endDate = format(new Date(courseWithId.endDate), "dd/MM/yyyy");
      startDateTimeStamp = toTimestampConverter(startDate);
      endDateTimeStamp = toTimestampConverter(endDate);
      noneSelected = false;
    } else {
      noneSelected = true;
    }

    updateCourseDates({
      startDate: startDate,
      endDate: endDate,
      startDateTimeStamp,
      endDateTimeStamp,
      noneSelected,
      courseId,
    });
  };

  const toTimestampConverter = (dateString: string) => {
    const dateObject = parse(dateString, "dd/MM/yyyy", new Date());
    return getTime(dateObject);
  };

  // handle month filter === >>
  const handleMonthFilterChange = (e: any) => {
    if (e.type === "change") {
      // setSelectedMonth(e.target.value);
      setHandleMonthFilter([e.target.value]);
    }
  };

  // get Months between start & end timestamp === >>
  useEffect(() => {
    if (courseDates !== "") {
      const monthListArr = getMonthList(courseDates);
      setMonthList(monthListArr);
    }
  }, [courseDates]);

  const renderCourseOptions = (categories: any) => {
    return (
      <React.Fragment>
        {categories.map((parentCategory: any) => {
          if (parentCategory.level === 1 && parentCategory.parent === 0) {
            return (
              <React.Fragment key={parentCategory.id}>
                {parentCategory.haschild === true ? (
                  <optgroup label={parentCategory.name} key={parentCategory.id}>
                    {handleChildrens(parentCategory, categories)}
                  </optgroup>
                ) : (
                  <React.Fragment>
                    {parentCategory.courses.length > 0 && (
                      <optgroup
                        label={parentCategory.name}
                        key={parentCategory.id}
                      >
                        {renderCourse(
                          parentCategory.courses,
                          parentCategory.level
                        )}
                      </optgroup>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          }
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2 input-styles">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="courses" hidden>
                Courses
              </label>
              <select
                className="form-select"
                name="workloadCourse"
                value={selectedCourse}
                onChange={handleCourseFilterChange}
              >
                <option value={0}>Select Course</option>
                {renderCourseOptions(workloadCourses)}
              </select>
            </Col>
            <Col>
              <label htmlFor="faculty" hidden>
                Faculty
              </label>
              <select
                className="form-select"
                name="faculty"
                value={selectedFaculty}
                onChange={handleFacultyFilterChange}
              >
                <option value={0}>Select Faculty</option>
                {courseFacultyData.items.map((faculty: any) => (
                  <option value={faculty.userId} key={faculty.userId}>
                    {faculty.userFirstName.charAt(0).toUpperCase() +
                      faculty.userFirstName.slice(1)}{" "}
                    {faculty.userLastName}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">
                Filter
              </Button>
              <Button
                variant="outline-secondary"
                type="reset"
                onClick={formik.handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="d-flex gap-4 dates-wrapper">
          <div>
            <img src={startDateIcon} alt="start Date" />
            <b>Start Date:</b> {courseDates.startDate}
          </div>
          <div>
            <img src={endDateIcon} alt="End Date" />
            <b>End Date: </b> {courseDates.endDate}
          </div>
          {courseDates.startDate !== "--/--/----" &&
            courseDates.endDate !== "--/--/----" && (
              <div>
                <label htmlFor="month">Month:</label>
                <select
                  className="form-select"
                  name="workloadCourse"
                  onChange={handleMonthFilterChange}
                  // value={ChangeFilterStatus}
                >
                  <option value={0}>Select Month</option>
                  {Object.entries(monthList).map(([year, months]: any) => (
                    <optgroup label={year} key={year}>
                      {Array.isArray(months) &&
                        months.map(
                          (month: any, index: React.Key | null | undefined) => (
                            <option
                              value={`${month},${year}`}
                              key={`${year}-${index}`}
                              // Conditionally render selected option based on state
                              selected={
                                changeFilterStatus === `${month},${year}`
                              }
                            >
                              {month}
                            </option>
                          )
                        )}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}
        </div>
        <div className="slot-indicator">
          <div className="me-1 available d-flex">
            <i className="fa-solid fa-envelope-circle-check me-1"></i>Change
            Request
            <div
              style={{
                backgroundColor: "#f7cdcd",
                color: "#e00b0b",
                width: "20px",
                height: "20px",
                marginLeft: "3px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontWeight: "450",
              }}
            >
              <span>{requestCount}</span>
            </div>
          </div>
          <div className="me-1 available">Available Slots</div>
          <div className="me-1 booked">Not Available Slots</div>
          <div className="me-1 weekend">Break/Weekend/Holiday</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageFilter;
