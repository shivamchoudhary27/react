import { useState } from "react";
import { useFormik } from "formik";
import "./style.scss";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { filterConfig } from "../../utils/filterTimeout";
import FilterDropdown from "./filterDropdown";

const Filter = ({ updateinputfilters, currentInstitute, coursesList }: any) => {
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
              <FilterDropdown
                name="All Semesters"
                // currentInstitute={currentInstitute}
                options={[
                  { id: 1, fullname: "Semester I" },
                  { id: 2, fullname: "Semester II" },
                  { id: 3, fullname: "Semester III" },
                  { id: 4, fullname: "Semester IV" },
                ]}
              />
            </Col>
            <Col>
              <FilterDropdown
                name="All Courses"
                options={coursesList}
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
