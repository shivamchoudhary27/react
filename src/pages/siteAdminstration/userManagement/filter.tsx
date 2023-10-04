import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { getData } from "../../../adapters/coreservices";
import { filterConfig } from "../../../utils/filterTimeout";

const initialValues = {
  name: "",
  email: "",
  roleId: ""
}

const Filter = ({updatefilters, toggleUploadModal, openAddUserModal, userPermissions} : any) => {
  const currentInstitute = useSelector((state: any) => state.globalFilters.currentInstitute);
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [roleFilter, setRolesFilter] = useState<any>([]);

  // get programs API call === >>>
  useEffect(() => {
    // if (currentInstitute > 0) {
      getData(`/${currentInstitute}/roles`, {pageNumber: 0, pageSize: 100})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setRolesFilter(result.data.items)
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    // }
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        email: values.email, 
        roleId: values.roleId
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      formik.setValues({
        name: "",
        email: "",
        roleId: ""
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
        roleId: event.target.name === 'roleId' ? event.target.value : formik.values.roleId,
      };
      updatefilters(newRequest);
    }, filterConfig.timeoutNumber);

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
              <label htmlFor="roleId" hidden>Role</label>
              <select 
                className="form-select" 
                name="roleId" 
                onChange={handleFilterChange} 
                value={formik.values.roleId}
              >
                <option value="">All Roles</option>                
                {roleFilter.map((role: any) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          {userPermissions.role.canView && 
            <Button variant="primary" onClick={()=>navigate("/manageroles")}>Manage Roles</Button>
          } 
          {userPermissions.user.canUpload && 
            <Button variant="primary" onClick={toggleUploadModal}>Upload Users</Button>
          }
          {userPermissions.user.canAdd &&
            <Button variant="primary" onClick={openAddUserModal}>Add User</Button>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
