import React from "react";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";

type Props = {};

// Formik Yup validation === >>>
const Schema = Yup.object({});

const initialValues = {
  cosnumber: "",
  abbreviation: "",
  abstract: "",
};

const DefineCos = (props: Props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        //   validationSchema={Schema}
        onSubmit={(values, action) => {
          // handleFormData(values, action);
          console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <Row className="gy-3">
                <Col md={6}>
                  <FieldLabel
                    htmlfor="cosnumber"
                    labelText="Number of CO's"
                    required="required"
                    // star="*"
                  />
                  <FieldTypeText
                    name="cosnumber"
                    placeholder="Number of CO's"
                  />
                  <FieldErrorMessage
                    errors={errors.cosnumber}
                    touched={touched.cosnumber}
                  />
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="abbreviation"
                      labelText="Abbreviation"
                      required="required"
                      // star="*"
                    />
                    <FieldTypeText
                      name="abbreviation"
                      placeholder="Abbreviation"
                    />
                    <FieldErrorMessage
                      errors={errors.abbreviation}
                      touched={touched.abbreviation}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <FieldLabel
                htmlfor="abstract"
                labelText="Abstract"
                // required="required"
              />
              <FieldTypeTextarea
                name="abstract"
                component="textarea"
                placeholder="Write Here .."
              />
              <FieldErrorMessage
                errors={errors.abstract}
                touched={touched.abstract}
              />
            </div>

            <div className="modal-buttons">
              <CustomButton
                type="submit"
                variant="primary"
                isSubmitting={isSubmitting}
                btnText="Save & Continue"
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
    </React.Fragment>
  );
};

export default DefineCos;
