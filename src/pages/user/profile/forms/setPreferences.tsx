import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { postData } from "../../../../adapters/microservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../../widgets/formInputFields/formCheckboxField";

const initialValues = {};

// Formik Yup validation === >>>
// const formSchema = Yup.object({
//   newPassword: Yup.string().required("New password is required"),
//   currentPassword: Yup.string().required("Current password is required"),
//   confirmPassword: Yup.string().required("Confirm new password is required"),
// });

const SetPreferences = ({
  timeSlotList,
  workloadList,
  togglemodalshow,
  updateAddRefresh,
  currentInstitute,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // set initial values === >>>
  useEffect(() => {
    workloadList.forEach((item: any, index: number) => {
      item.slots.forEach((el: any) => {
        initialValues[`workload_${index}`] = item.workLoad;
        initialValues[`${el.id}`] = el.id;
      })
    });
  }, [workloadList])

  const findTimeSlot = (key : string) => {
    var packetFound = [];
    for (let i = 0; i < timeSlotList.length; i++) {
      if (timeSlotList[i].hasOwnProperty(key)) {
        packetFound =  timeSlotList[i][key];
        break;
      }
    }
    return packetFound;
  }

  const getWorkloadSlots = (values: any, key: string) => {
    return findTimeSlot(key).filter((item: any) => {
      if (values[item.id] !== undefined && values[item.id] !== false) {
        return item;
      }
    });
  }

  // handle Form CRUD operations === >>>
    const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
        console.log(values)
      let endPoint = `/${currentInstitute}/timetable/userworkload`;
      setSubmitting(true);
    const newFormValues = workloadList.map((item: any, index: number) => {
      return {
        ...item,
        workLoad: values[`workload_${index}`] !== undefined ? values[`workload_${index}`] : '',
        slots: getWorkloadSlots(values, `dpt_${item.departmentId}`), //  findTimeSlot(`dpt_${item.departmentId}`),
      };
    });
    postData(endPoint, newFormValues)
      .then((res: any) => {
        if (res.data !== "") {
          setSubmitting(false);
          // resetForm();
          setShowAlert(true);
          setAlertMsg({
            message: "Added Successfully!",
            alertBoxColor: "success",
          });
          console.log(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
        setSubmitting(false);
        setShowAlert(true);
        setAlertMsg({
          message: "Failed to add workload and slots! Please try again.",
          alertBoxColor: "danger",
        });
      });
    };

  // render time slot list according to department === >>>
  const RenderTimeSlotList = (id: any) => {
    const [slotItem, setSlotItem] = useState([]);
    let departmentIdKey = `dpt_${id.item}`;
    useEffect(() => {
      timeSlotList.map((slotList: any) => {
        if (Object.keys(slotList)[0] === departmentIdKey) {
          setSlotItem(slotList[departmentIdKey]);
        }
      });
    }, [workloadList]);

    return (
      <React.Fragment>
        {slotItem.map((slot: any) => (
          <div key={slot.id} className="mb-3">
            <FieldTypeCheckbox
              name={`${slot.id}`}
              checkboxLabel={`${slot.startTime} to ${slot.endTime}`}
            />
          </div>
        ))}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <TimerAlertBox
        className="mb-3"
        showAlert={showAlert}
        alertMsg={alertMsg.message}
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
      />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        // validationSchema={formSchema}
        onSubmit={(values, action) => {
            handleFormData(values, action);
        //   console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="row">
            {workloadList.map((item: any, index: number) => (
              <div key={index}>
                <h5>Department: {item.departmentName}</h5>
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
                <RenderTimeSlotList item={item.departmentId} />
              </div>
            ))}

            {isSubmitting === false ? (
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  btnText="Update"
                />{" "}
                {workloadList.id === 0 && (
                  <CustomButton
                    type="reset"
                    btnText="Remove Picture"
                    variant="outline-secondary"
                    onClick={() => setShowAlert(false)}
                  />
                )}
              </div>
            ) : (
              <LoadingButton
                variant="primary"
                btnText={"Updating..."}
                className="modal-buttons"
              />
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default SetPreferences;
