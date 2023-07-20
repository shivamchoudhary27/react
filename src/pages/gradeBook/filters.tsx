import { useState } from "react";
import { useFormik } from "formik";
import "./style.scss";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { filterConfig } from "../../utils/filterTimeout";
import FilterDropdown from "./filterDropdown";

const Filter = ({
  updatedepartment,
  updateinputfilters,
  currentInstitute,
}: any) => {
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
                updatedepartment={updatedepartment}
                currentInstitute={currentInstitute}
              />
            </Col>
            <Col>
              <FilterDropdown
                updatedepartment={updatedepartment}
                currentInstitute={currentInstitute}
              />
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default Filter;
