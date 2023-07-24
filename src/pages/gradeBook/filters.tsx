import { useState } from "react";
import { useFormik } from "formik";
import "./style.scss";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { filterConfig } from "../../utils/filterTimeout";
import { SemesterFilterDropdown, CourseFilterDropdown } from "./filterDropdown";

const Filter = ({ updateinputfilters, currentInstitute, coursesList, getCourseId }: any) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const initialValues = {
    name: "",
    code: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        code: values.code,
      };
      updateinputfilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
        code: "",
      });
      updateinputfilters(initialValues);
    },
  });

  return (
    <>
      <div className="filter-wrapper mt-2 input-styles">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <SemesterFilterDropdown
                name="All Semesters"
                // currentInstitute={currentInstitute}
                options={[
                  { id: 1, name: "Semester I" },
                  { id: 2, name: "Semester II" },
                  { id: 3, name: "Semester III" },
                  { id: 4, name: "Semester IV" },
                ]}
              />
            </Col>
            <Col>
              <CourseFilterDropdown
                name="All Courses"
                options={coursesList}
                getCourseId={getCourseId}
                // currentInstitute={currentInstitute}
              />
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default Filter;
