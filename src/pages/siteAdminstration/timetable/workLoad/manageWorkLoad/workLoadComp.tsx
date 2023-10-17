import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { putData } from "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";

type Props = {
  workloadData: any;
  currentInstitute: any;
  timeSlotList: any;
};

const initialValues = {};

const WorkLoadComp = (props: Props) => {
  const { userId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // set initial values === >>>
  useEffect(() => {
    props.workloadData.forEach((item: any, index: number) => {
      item.slots.forEach((el: any) => {
        initialValues[`workload_${index}`] = item.workLoad;
        initialValues[`${el.id}`] = el.id;
      })
    });
  }, [props.workloadData])

  const findTimeSlot = (key : string) => {
    var packetFound = [];
    for (let i = 0; i < props.timeSlotList.length; i++) {
      if (props.timeSlotList[i].hasOwnProperty(key)) {
        packetFound =  props.timeSlotList[i][key];
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
    setSubmitting(true);
    const newFormValues = props.workloadData.map((item: any, index: number) => {
      return {
        ...item,
        workLoad: values[`workload_${index}`] !== undefined ? values[`workload_${index}`] : '',
        slots: getWorkloadSlots(values, `dpt_${item.departmentId}`), //  findTimeSlot(`dpt_${item.departmentId}`),
      };
    });

    let endPoint = `/${props.currentInstitute}/timetable/userworkload/${userId}`;
    putData(endPoint, newFormValues)
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
    let departmentIdKey = `dpt_${id.item}`
    useEffect(() => {
      props.timeSlotList.map((slotList: any) => {
        if(Object.keys(slotList)[0] === departmentIdKey){
          setSlotItem(slotList[departmentIdKey])
        }
      })
    }, [props.timeSlotList, props.workloadData])

    return (
      <React.Fragment>
        {slotItem.map((slot: any) =>
          <div key={slot.id} className="mb-3">
            <FieldTypeCheckbox
              name={`${slot.id}`}
              checkboxLabel={`${slot.startTime} to ${slot.endTime}`}
            />
          </div>
        )}
      </React.Fragment>
    );
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
            // console.log(val)
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {props.timeSlotList.length > 0 &&
                props.workloadData.map((item: any, index: number) => (
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
                    <RenderTimeSlotList item={item.departmentId} />
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
                  {/* <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  /> */}
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
      {/* } */}
    </React.Fragment>
  );
};

export default WorkLoadComp;
