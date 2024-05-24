import * as Yup from "yup";
import Swal from "sweetalert2";
import { Alert, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { getData, postData } from "../../../../adapters/microservices";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";

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
  const [buttonClicked, setButtonClicked] = useState("");
  const [isSubmittingSave, setIsSubmittingSave] = useState(false);
  const [isSubmittingSaveAndContinue, setIsSubmittingSaveAndContinue] =
    useState(false);
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });

  const [initValues, setInitValues] = useState({
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

  const handleFormSubmit = (values: any) => {
    const submitAction =
      buttonClicked === "save"
        ? setIsSubmittingSave
        : setIsSubmittingSaveAndContinue;
    submitAction(true);
    postData(`/${cid}/courseoutcomes`, values)
      .then((result: any) => {
        if (result.data !== "" && result.status === 201) {
          if (buttonClicked === "save") {
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Course outcomes defined and saved successfully.",
            });
          } else if (buttonClicked === "saveAndContinue") {
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Course outcomes defined successfully. Moving to the next step.",
            });
            setTimeout(() => {
              props.setActiveTab(1);
            }, 3000);
          }
        }
        submitAction(false);
      })
      .catch((err: any) => {
        console.log(err);
        setApiCatchError({
          status: true,
          msg: `${err.response.data.errorCode}: ${err.response.data.message}`,
        });
        submitAction(false);
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
            handleFormSubmit(values);
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
                  isSubmitting={isSubmittingSave}
                  onClick={() => setButtonClicked("save")}
                  btnText={!isSubmittingSave ? "Save" : "Saving..."}
                  disabled={initValues.abbreviation === "" && initValues.abstact === ""}
                />{" "}
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmittingSaveAndContinue}
                  onClick={() => setButtonClicked("saveAndContinue")}
                  disabled={initValues.abbreviation === "" && initValues.abstact === ""}
                  btnText={
                    !isSubmittingSaveAndContinue
                      ? "Save & Continue"
                      : "Loading..."
                  }
                />{" "}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </React.Fragment>
  );
};

export default DefineCos;
