import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";

// initialValues === >>>
const initialValues = {};

// Formik Yup validation === >>>
const Schema = Yup.object({});

const dataList = [
  {
    id: 1,
    name: "option 1",
  },
  {
    id: 2,
    name: "option 2",
  },
  {
    id: 3,
    name: "option 3",
  },
];

const EnrolUserModal = ({ show, onHide, togglemodalshow }: any) => {
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enrol users
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="users"
                    labelText="Select users"
                    required="required"
                  />
                  <FieldTypeSelect
                    name="users"
                    options={dataList}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="cohorts"
                    labelText="Select cohorts"
                    required="required"
                  />
                  <FieldTypeSelect
                    name="cohorts"
                    options={dataList}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="role"
                    labelText="Assign role"
                    required="required"
                  />
                  <FieldTypeSelect
                    name="role"
                    options={dataList}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                  />
                </div>

                <div className="mb-3">
                  <Link to="">Show more ...</Link>
                </div>

                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    //   isSubmitting={isSubmitting}
                    btnText="Enrol selected users"
                  />{" "}
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default EnrolUserModal;
