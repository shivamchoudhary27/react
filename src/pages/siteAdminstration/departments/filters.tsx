// import React, { useState } from "react";
// import "./style.scss";
// import { Button, Row, Col, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Filter = ({
//   toggleModalShow,
//   resetDepartmentForm,
//   departmentData,
//   setDepartmentData,
//   refreshDepartmentData,
//   updateInputFilters,
// }: any) => {
//   const navigate = useNavigate();
//   const [searchValue, setSearchValue] = useState("");

//   const handleSearch = (e: any) => {
//     e.preventDefault();
//   };

//   const getInputValues = () => {
//     updateInputFilters(searchValue);
//   };

//   const resetHandler = () => {
//     updateInputFilters("");
//     setSearchValue("");
//   };

//   // handle to open Add Department modal === >>>
//   const openAddDepartment = () => {
//     toggleModalShow(true);
//     resetDepartmentForm(true);
//   };

//   return (
//     <>
//       <div className="filter-wrapper">
//         <form onSubmit={handleSearch}>
//           <Row className="align-items-center gx-3">
//             <Col className="col-auto">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Name"
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 value={searchValue}
//               />
//             </Col>
//             <Col className="col-auto">
//               <Button variant="primary" className="me-2" onClick={() => getInputValues()}>
//                 Filter
//               </Button>{" "}
//               <Button variant="outline-secondary" onClick={() => resetHandler()}>
//                 Reset
//               </Button>
//             </Col>
//           </Row>
//         </form>
//         <Button variant="primary" onClick={openAddDepartment}>Add Department</Button>
//       </div>
//     </>
//   );
// };

// export default Filter;

import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
}

const Filter = ({  toggleModalShow,
  resetDepartmentForm,
  departmentData,
  setDepartmentData,
  refreshDepartmentData,
  updateInputFilters,} : any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        name: values.name,
      }
      // updateInputFilters(newRequest)
      // updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        name: "",
      });
      // updateInputFilters(newRequest)
      // updateInputFilters(initialValues, true);
    }
  });

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    toggleModalShow(true);
    resetDepartmentForm(true);
  };
  
  return (
    <React.Fragment>
      {/* Institute : <InstituteFilter updateCurrentInstitute={updateCurrentInstitute}/> */}
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className="row">
            <div className="col-auto">
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="col-auto">
            <Button variant="primary" type="submit" className="me-2">Filter</Button>
            <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </div>
          </div>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddDepartment}>Add Department</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
