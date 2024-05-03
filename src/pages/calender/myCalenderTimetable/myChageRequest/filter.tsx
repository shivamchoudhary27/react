import { useFormik } from "formik";
import { format, parse, getTime } from "date-fns";
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { renderCourse, handleChildrens } from "../utils";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
import { courseDatesObj } from "../utils";
import { useSelector } from "react-redux";

const ManageFilter = ({
  programFilter,
  workloadCourses,
  selectedProgram,
  setSelectedProgram,
  ids,
  updateCourseDates,
  setCoursesStatus,
  updateFacultyStatus,
  selectedDepartment,
  setSelectedDepartment,
}: any) => {
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  const initialValues = {
    name: "",
    faculty: "",
    workloadCourse: "",
  };
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };

  const [selectedCourse, setSelectedCourse] = useState<number>(0);
  const [coursesOnly, setCoursesOnly] = useState<any>([]);

  const [courseFacultyData, setCourseFacultyData] = useState<any>(dummyData);

  useEffect(() => {
    updateFacultyStatus(currentUserInfo.uid);
  }, [currentUserInfo]);

  useEffect(() => {
    if (coursesOnly.length === 0) setCoursesStatus(true);
    else setCoursesStatus(false);
  }, [coursesOnly, setCoursesStatus]);

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
      console.log(values);
    },
    onReset: () => {
      setSelectedProgram(0);
      setSelectedCourse(0);
      updateCourseDates(courseDatesObj);
    },
  });

  const handleDepartmentFilterChange = (e: any) => {
    setSelectedDepartment(e.target.value);
    handleCourseDates(parseInt(e.target.value));
  };

  const handleProgramFilterChange = (e: any) => {
    setSelectedProgram(parseInt(e.target.value));
    handleCourseDates(parseInt(e.target.value));
  };

  const handleCourseFilterChange = (e: any) => {
    setSelectedCourse(parseInt(e.target.value));
    handleCourseDates(parseInt(e.target.value));
  };

  const handleCourseDates = (courseId: number) => {
    let startDate = "--/--/----",
      endDate = "--/--/----";
    let startDateTimeStamp,
      endDateTimeStamp = 0;

    const courseWithId = coursesOnly.find(
      (item: any) => item.courseid === courseId
    );
    if (courseWithId) {
      startDate = format(new Date(courseWithId.startDate), "dd/MM/yyyy");
      endDate = format(new Date(courseWithId.endDate), "dd/MM/yyyy");
      startDateTimeStamp = toTimestampConverter(startDate);
      endDateTimeStamp = toTimestampConverter(endDate);
    }

    updateCourseDates({
      startDate: startDate,
      endDate: endDate,
      startDateTimeStamp,
      endDateTimeStamp,
      courseId,
    });
  };

  const toTimestampConverter = (dateString: string) => {
    const dateObject = parse(dateString, "dd/MM/yyyy", new Date());
    return getTime(dateObject);
  };

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
              <label htmlFor="Department" hidden>
                Department
              </label>
              <select
                className="form-select"
                name="department"
                value={selectedDepartment}
                onChange={handleDepartmentFilterChange}
              >
                <option value={0}>Select Department</option>
                {Object.entries(programFilter.departments).map(([id, name]) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </Col>

            <Col>
              <label htmlFor="Program" hidden>
                Program
              </label>
              <select
                className="form-select"
                name="program"
                value={selectedProgram}
                onChange={handleProgramFilterChange}
              >
                <option value={0}>Select Program</option>
                {programFilter.programs.map((program: any) => (
                  <option value={program.id} key={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </Col>
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
    </React.Fragment>
  );
};

export default ManageFilter;
