import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Row, Col } from "react-bootstrap";
import { renderCourse, handleChildrens } from "./utils";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
import { format } from 'date-fns';

const ManageFilter = ({ workloadCourses, ids, updateCourseDates } : any) => {
  const initialValues = {
    name: "",
    code: "",
    workloadCourse: ""
  };
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [courseFacultyData, setCourseFacultyData] = useState<any>(dummyData);
  const [selectedCourse, setSelectedCourse] = useState<number>(0);
  const [selectedFaculty, setSelectedFaculty] = useState<number>(0);
  const [coursesOnly, setCoursesOnly] = useState<any>([]);

  useEffect(() => {
    if (workloadCourses.length > 0) {
      let collectCourses = workloadCourses.filter((item: any) => item.coursename);
      setCoursesOnly(collectCourses);
      console.log('collectCourses', collectCourses)
    }
  }, [workloadCourses])

  useEffect(() => {
    if (selectedCourse > 0) {
      makeGetDataRequest(
        `/course/${selectedCourse}/enrol-user`,
        {pageNumber: 0, pageSize: 100, teachersOnly: true},
        setCourseFacultyData
      );
    }
  }, [selectedCourse]);
  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // console.log('filter values', values);
    },
    onReset: () => {
    },
  });

  const handleCourseFilterChange = (e: any) => {
    setSelectedCourse(parseInt(e.target.value));
    setSelectedFaculty(0);
    handleCourseDates(parseInt(e.target.value));
  };
  
  const handleCourseDates = (courseId: number) => {
    const courseWithId = coursesOnly.find((item: any) => item.courseid === courseId);
    let startDate, endDate = ''
    if (courseWithId) {
      startDate = format(new Date(courseWithId.startDate), 'dd/MM/yyyy');
      endDate = format(new Date(courseWithId.endDate), 'dd/MM/yyyy');
    } else {
      startDate = "--/--/----";
      endDate = "--/--/----";
    }
    updateCourseDates({startDate: startDate, endDate: endDate});
  }

  const handleFacultyFilterChange = (e: any) => {
    setSelectedFaculty(parseInt(e.target.value));
  };

  const renderCourseOptions = (categories: any) => {
    return (
      <React.Fragment>
         {categories.map((parentCategory: any) => {
          if (parentCategory.level === 1 && parentCategory.parent === 0) {
            return (
              <React.Fragment key={parentCategory.id}>
                {parentCategory.haschild === true ?
                  <optgroup label={parentCategory.name} key={parentCategory.id}>
                      {handleChildrens(parentCategory, categories)}
                  </optgroup>
                  :
                  <React.Fragment>
                    {parentCategory.courses.length > 0 &&
                      <optgroup label={parentCategory.name} key={parentCategory.id}>
                          {renderCourse(parentCategory.courses, parentCategory.level)}
                      </optgroup>
                    }
                  </React.Fragment>
                }
              </React.Fragment>
            )
          }
         })}
      </React.Fragment>
    );
  }
  
  return (
    <>
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
                  <option value={faculty.userId} key={faculty.userId}>{`${faculty.userFirstName} ${faculty.userLastName}`}</option>
                ))}
              </select>
            </Col>
            <Col>
              <label htmlFor="code" hidden>
                Program Code
              </label>
              <input
                className="form-control"
                id="code"
                name="code"
                type="text"
                // value={formik.values.code}
              />
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
    </>
  );
};

export default ManageFilter;
