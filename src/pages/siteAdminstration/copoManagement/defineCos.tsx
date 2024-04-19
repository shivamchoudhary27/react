import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import CustomButton from "../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { Col} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../../adapters/microservices";

type Props = {
  setActiveTab:any
};

// Formik Yup validation === >>>

const validationSchema = Yup.object({
  abbreviation: Yup.string().required("Required"),
  abstact: Yup.string().required("Required"),
});

const DefineCos = (props: Props) => {


const { id } = useParams();


const [initValues, setInitValues] = useState({
  // countOfCourseOutcomes: "",
  abbreviation: '',
  abstact: '',
});

useEffect(() => {
  getInitialValueApi();
}, []);

const getInitialValueApi = () => {

  getData(`/${id}/courseoutcomes`,{})
    .then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        // setInitData(res.data);

        setInitValues({
          abbreviation: res.data.abbreviation,
          abstact: res.data.abstact,
        });

      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};


const handleFormSubmit = (values: any, { setSubmitting }: any) => {
  setSubmitting(true);
  postData(`/${id}/courseoutcomes`, {
    ...values,
  })
    .then((result: any) => {
      if (result.data !== "" && result.status === 201) {
      props.setActiveTab(1) 
     }
      setSubmitting(false);
    })
    .catch((err: any) => {
      console.log(err);
      // Handle error, maybe show an alert
    });
};

  return (
       <React.Fragment>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          handleFormSubmit(values, action);
          console.log(values);
        }}
      >

        {({ errors, touched, isSubmitting, handleChange }) => (
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
              <Col md={6}>
                  <div className="mb-3">
                   <label htmlFor="abbreviation">Abbreviation</label>
              <Field
                type="text"
                name="abbreviation"
                placeholder="Enter Abbreviation"
                as="textarea"
                value={initValues.abbreviation}
                onChange={(e) => {
                  handleChange(e);
                  setInitValues(prevState => ({ ...prevState, abbreviation: e.target.value }));
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
             
              <label htmlFor="abstact">Abstract</label>
              <Field
                type="text"
                name="abstact"
                placeholder="Enter Abstract"
                as="textarea"
                value={initValues.abstact}
                onChange={(e) => {
                  handleChange(e);
                  setInitValues(prevState => ({ ...prevState, abstact: e.target.value }));
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