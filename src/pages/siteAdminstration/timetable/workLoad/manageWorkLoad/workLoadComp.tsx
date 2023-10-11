import React from "react";
import { Formik, Form, Field } from "formik";
import { postData } from "../../../../../adapters/microservices";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";

type Props = {
  workloadData: any;
  currentInstitute: any;
};

const initialValues = {
  Workload: "",
};

const WorkLoadComp = (props: Props) => {
  // handle Form CRUD operations === >>>
  // const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
  //   console.log(values) 
  //   // return false
  //   let endPoint = `/${props.currentInstitute}/timetable/userworkload`;
  //   postData(endPoint, values)
  //     .then((res: any) => {
  //       if (res.data !== "") {
  //         // togglemodalshow(false);
  //         setSubmitting(false);
  //         // refreshClassroomData();
  //         resetForm();
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //       // setSubmitting(false);
  //       // setShowAlert(true);
  //       // setAlertMsg({
  //       //   message: "Failed to add department! Please try again.",
  //       //   alertBoxColor: "danger",
  //       // });
  //     });
  // };
  

  return (
    <React.Fragment>
      {props.workloadData.length > 0 ? (
        <p>{`User: ${props.workloadData[0].userFirstName} ${props.workloadData[0].userLastName} (${props.workloadData[0].userEmail})`}</p>
      ) : (
        ""
      )}
      <div>
        <Formik
          initialValues={initialValues}
          // validationSchema={workloadSchema}
          onSubmit={(values, action) => {
            // handleFormData(values, action);
            console.log(values)
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {props.workloadData.map((item: any, index: number) => (
                <div key={index}>
                  <h4>{item.departmentName}</h4>
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="Workload"
                      labelText="Workload in hour"
                      required="required"
                      // star="*"
                    />
                    <FieldTypeText
                      type="number"
                      name="Workload"
                      className="form-control"
                      placeholder="Workload in hour"
                    />
                    <FieldErrorMessage
                      errors={errors.Workload}
                      touched={touched.Workload}
                    />
                  </div>
                </div>
              ))}
              {isSubmitting === false ? (
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText="Submit"
                  />{" "}
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText="Submitting..."
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default WorkLoadComp;
