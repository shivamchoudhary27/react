import React from "react";
import { Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import FiltersDropdown from "./filtersDropdown";

type Props = {};

const initialValues = {
  name: "",
  code: "",
};

const Filters = (props: Props) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    onReset: () => {},
  });

  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            {dropdownFiltersData.map((item, index) => (
              <Col key={index}>
                <FiltersDropdown options={item.options} name={item.name} />
              </Col>
            ))}
          </Row>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Filters;

const dropdownFiltersData = [
  {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    name: "Academic Year"
  },
  {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    name: "Department"
  },
  {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    name: "Program"
  },
  {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    name: "Semester"
  },
  {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    name: "Course"
  },
  {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    name: "Student"
  },
];
