import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { Alert, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../../../adapters/microservices";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import Swal from "sweetalert2";

type Props = {
  setActiveTab: any;
};

// Formik Yup validation === >>>

const validationSchema = Yup.object({
  abbreviation: Yup.string().required("Abbreviation is required"),
  abstact: Yup.string().required("Abstact is required"),
});

const DefineCos = (props: Props) => {
  const { cid } = useParams();
  const [apiStatus, setApiStatus] = useState("");
  const [apiStatus2, setApiStatus2] = useState("");
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });

  const [initValues, setInitValues] = useState({
    // countOfCourseOutcomes: "",
    abbreviation: "",
    abstact: "",
  });

  useEffect(() => {
    getInitialValueApi();
  }, [cid]);

  const getInitialValueApi = () => {
    setApiStatus("started");
    getData(`/${cid}/courseoutcomes`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setInitValues({
            abbreviation: res.data.abbreviation,
            abstact: res.data.abstact,
          });
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        setApiStatus("finished");
        console.log(err);
        if (err.response.status === 404) {
          setApiCatchError({
            status: true,
            msg: `${err.response.data.errorCode}: ${err.response.data.message}`,
          });
        }
      });
  };

  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    postData(`/${cid}/courseoutcomes`, values)
      .then((result: any) => {
        if (result.data !== "" && result.status === 201) {
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "COs defined and save successfully."
          });
          setTimeout(() => {
            props.setActiveTab(1);
          }, 3000)
        }
        setSubmitting(false);
      })
      .catch((err: any) => {
        console.log(err);
        // Handle error, maybe show an alert
        setApiCatchError({
          status: true,
          msg: `${err.response.data.errorCode}: ${err.response.data.message}`,
        });
      });
  };

  return (
    <React.Fragment>
      {apiCatchError.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setApiCatchError({ status: false, msg: "" })}
          dismissible
        >
          {apiCatchError.msg}
        </Alert>
      )}
      {apiStatus === "started" ? (
        <RouterLadyLoader status={true} />
      ) : (
        <Formik
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            handleFormSubmit(values, action);
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            handleChange,
            values,
            setFieldValue,
          }) => (
            <Form>
              <div className="mb-3">
                {/* <Col md={6}>
                  <FieldLabel
                    htmlfor="countOfCourseOutcomes"
                    labelText="Number of CO's"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText
                    name="countOfCourseOutcomes"
                    placeholder="Number of CO's"
                  />
                  <FieldErrorMessage
                    errors={errors.countOfCourseOutcomes}
                    touched={touched.countOfCourseOutcomes}
                  />
                </Col> */}
                <Col md={12}>
                  <div className="mb-3">
                    <label htmlFor="abbreviation">Abbreviation *</label>
                    <Field
                      type="text"
                      name="abbreviation"
                      placeholder="Enter Abbreviation"
                      as="textarea"
                      className="form-control"
                      value={initValues.abbreviation}
                      onChange={(e: { target: { value: any } }) => {
                        handleChange(e);
                        setInitValues((prevState) => ({
                          ...prevState,
                          abbreviation: e.target.value,
                        }));
                      }}
                    />
                    <FieldErrorMessage
                      errors={errors.abbreviation}
                      touched={touched.abbreviation}
                    />
                  </div>
                </Col>
              </div>

              <div className="mb-3">
                <label htmlFor="abstact">Abstract *</label>
                <Field
                  type="text"
                  name="abstact"
                  className="form-control"
                  placeholder="Enter Abstract"
                  as="textarea"
                  value={initValues.abstact}
                  onChange={(e: { target: { value: any } }) => {
                    handleChange(e);
                    setInitValues((prevState) => ({
                      ...prevState,
                      abstact: e.target.value,
                    }));
                  }}
                />
                <FieldErrorMessage
                  errors={errors.abstact}
                  touched={touched.abstact}
                />
              </div>

              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText={!isSubmitting ? "Save & Continue" : "Loading..."}
                />{" "}
                {/* <CustomButton
                type="reset"
                btnText="Reset"
                variant="outline-secondary"
              /> */}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </React.Fragment>
  );
};

export default DefineCos;
