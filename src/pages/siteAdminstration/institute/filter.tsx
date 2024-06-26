import { useFormik } from "formik";
import React, { useState } from "react";
import { TypeFilter } from "./types/type";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../utils/filterTimeout";
import { FiltersLoadingBtn } from "../../../utils/filtersLoading";
import FilterButtonWrapper from "../../../widgets/filterButtonWrapper";

type TypeInitialValues = {
  name: string;
  shortCode: string;
}

const initialValues: TypeInitialValues = {
  name: "",
  shortCode: "",
}

const Filter: React.FunctionComponent<TypeFilter> = ({updatefilters, toggleUploadModal, openAddUserModal, permissions, apiStatus} : TypeFilter) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: TypeInitialValues) => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        shortCode: values.shortCode,
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      formik.setValues({
        shortCode: "",
        name:""
      });
      updatefilters(initialValues, true);
    }
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event : React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        shortCode: event.target.name === 'shortCode' ? event.target.value : formik.values.shortCode,
      };
      updatefilters(newRequest);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };


  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2 top-filter">
      <div className="site-button-group">
          {permissions.canAdd &&
            <Button variant="primary" onClick={openAddUserModal}>Add Institute</Button>
          }
        </div>
   <div className="filterdropdown">
   <FilterButtonWrapper>
   <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col md="auto">
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Institute Name"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col md="auto">
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="shortCode"
                name="shortCode"
                type="text"
                placeholder="Short Code"
                onChange={handleFilterChange}
                value={formik.values.shortCode}
              />
            </Col>
            <Col md="auto">
              {FiltersLoadingBtn(apiStatus)}
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
   </FilterButtonWrapper>
   </div>
       
      </div>
    </React.Fragment>
  );
};

export default Filter;
