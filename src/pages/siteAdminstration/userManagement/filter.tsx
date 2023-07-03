import React, { useState} from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { filterConfig } from "../../../utils/filterTimeout";

const initialValues = {
  name: "",
  email: "",
}

const Filter = ({updatefilters, toggleUploadModal, openAddUserModal} : any) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        email: values.email, 
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      formik.setValues({
        name: "",
        email: "",
      });
      updatefilters(initialValues, true);
    }
  });

  
  // Event handler for filter input change with debounce
  const handleFilterChange = (event : any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        email: event.target.name === 'email' ? event.target.value : formik.values.email,
      };
      updatefilters(newRequest);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Firstname / Surname"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleFilterChange}
                value={formik.values.email}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={()=>navigate("/manageroles")}>Manage Roles</Button>{" "}
          <Button variant="primary" onClick={toggleUploadModal}>Upload Users</Button>{" "}
          <Button variant="primary" onClick={openAddUserModal}>Add User</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
