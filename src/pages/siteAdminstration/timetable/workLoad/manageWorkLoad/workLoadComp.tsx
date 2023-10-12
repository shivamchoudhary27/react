import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { putData } from "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";

type Props = {
  workloadData: any;
  currentInstitute: any;
};

const initialValues = {
  // Workload: "",
};

const WorkLoadComp = (props: Props) => {
  const { userId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({message: "", alertBoxColor: "",});

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    const newFormValues = props.workloadData.map((item: any, index: number) => {
      return {
        ...item,
        // departmentId: item.departmentId,
        workLoad: values[`workload_${index}`],
        slots: item.slots.filter((slotItem: any, slotIndex: number) => {
          if (values[`slotid_${slotItem.id}`] === true) {
            return slotItem;
          }
        }),
      };
    });

    let endPoint = `/${props.currentInstitute}/timetable/userworkload/${userId}`;
    putData(endPoint, newFormValues)
      .then((res: any) => {
        if (res.data !== "") {
          setSubmitting(false);
          resetForm();
          setShowAlert(true);
          setAlertMsg({
            message: "Added Successfully!",
            alertBoxColor: "success",
          });
          console.log(values)
        }
      })
      .catch((err: any) => {
        console.log(err);
        setSubmitting(false);
        setShowAlert(true);
        setAlertMsg({
          message: "Failed to add department! Please try again.",
          alertBoxColor: "danger",
        });
      });
  };

  return (
    <React.Fragment>
      {props.workloadData.length > 0 ? (
        <p>{`User: ${props.workloadData[0].userFirstName} ${props.workloadData[0].userLastName} (${props.workloadData[0].userEmail})`}</p>
      ) : (
        ""
      )}
      <div>
        <TimerAlertBox
          alertMsg={alertMsg.message}
          className="mt-3"
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
        <Formik
          initialValues={initialValues}
          // validationSchema={workloadSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {props.workloadData.map((item: any, index: number) => (
                <div key={index}>
                  <h4>{item.departmentName}</h4>
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor={`workload_${index}`}
                      labelText="Workload in hour"
                      required="required"
                      // star="*"
                    />
                    <FieldTypeText
                      type="number"
                      name={`workload_${index}`}
                      className="form-control"
                      placeholder="Workload in hour"
                    />
                  </div>
                  {item.slots.length > 0 &&
                    item.slots.map((el: any, index: number) => (
                      <div className="mb-3" key={index}>
                        <FieldTypeCheckbox
                          name={`slotid_${el.id}`}
                          checkboxLabel={`${el.startTime} to ${el.endTime}`}
                        />
                      </div>
                    ))}
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
