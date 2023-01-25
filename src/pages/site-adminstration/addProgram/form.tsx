import React from "react";
import './style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";

const AddProgramForm = () => {
  return (
    <>
      <div className="form-wrapper">
        <Formik
          initialValues={{
            department: "",
            program_name: "",
            program_code: "",
            program_type: "",
          }}
        >
          <Form>
            <div>
              <label>Department</label>
              <input type="text" className="form-control mb-3" />
            </div>
            <div>
              <label>Program Name</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="#Name"
              />
            </div>
            <div>
              <label>Program Code</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="#Code"
              />
            </div>
            <div>
              <label>Program Code</label>
              <input type="radio" name="click" value="certificate" />
              Certificate & Diploma
              <input type="radio" name="click" value="underGrad" />
              Under Graduate
              <input type="radio" name="click" value="postGrad" />
              Post Graduate
              <input type="radio" name="click" value="phd" />
              Ph.D
            </div>
            <Button variant="primary">Submit</Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;
