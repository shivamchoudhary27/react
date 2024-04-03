import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { putData } from "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import FacultyWorkLoadSkeleton from "../skeleton/facultyWorkLoadSkeleton";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import { Col, Row } from "react-bootstrap";

type Props = {
  apiStatus: string;
  workloadData: any;
  timeSlotList: any;
  currentInstitute: any;
};

const initialValues = {};

// Formik Yup validation === >>>
const generateValidationSchema = (workloadList: any) => {
  return Yup.lazy((values) => {
    const schema = {};
    workloadList.forEach((item: any, index: number) => {
      const fieldName = `workload_${index}`;
      schema[fieldName] = Yup.number()
        .typeError("Must be a number")
        .required("Work load field is required")
        .positive("Work load hour must be in positive integer");
    });
    return Yup.object().shape(schema);
  });
};

const WorkLoadComp = (props: Props) => {
  const { userId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const validationSchema = generateValidationSchema(props.workloadData);

  // set initial values === >>>
  useEffect(() => {
    props.workloadData.forEach((item: any, index: number) => {
      initialValues[`workload_${index}`] = item.workLoad;
      item.slots.forEach((el: any) => {
        // initialValues[`workload_${index}`] = item.workLoad;
        initialValues[`${el.id}`] = el.id;
      });
    });
  }, [props.workloadData]);

  const findTimeSlot = (key: string) => {
    var packetFound = [];
    for (let i = 0; i < props.timeSlotList.length; i++) {
      if (props.timeSlotList[i].hasOwnProperty(key)) {
        packetFound = props.timeSlotList[i][key];
        break;
      }
    }
    return packetFound;
  };

  const getWorkloadSlots = (values: any, key: string) => {
    return findTimeSlot(key).filter((item: any) => {
      if (values[item.id] !== undefined && values[item.id] !== false) {
        return item;
      }
    });
  };

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    const newFormValues = props.workloadData.map((item: any, index: number) => {
      return {
        ...item,
        workLoad:
          values[`workload_${index}`] !== undefined
            ? values[`workload_${index}`]
            : "",
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
    let departmentIdKey = `dpt_${id.item}`;
    useEffect(() => {
      props.timeSlotList.map((slotList: any) => {
        if (Object.keys(slotList)[0] === departmentIdKey) {
          setSlotItem(slotList[departmentIdKey]);
        }
      });
    }, [props.timeSlotList, props.workloadData]);

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
      {props.workloadData.length > 0 ? (
        <p className="filter-wrapper">{`User: ${props.workloadData[0].userFirstName} ${props.workloadData[0].userLastName} (${props.workloadData[0].userEmail})`}</p>
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
        {props.apiStatus === "started" && props.workloadData.length === 0 ? (
          <FacultyWorkLoadSkeleton />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
           <div>
               <Form>
                   <Row className="justify-content-center">
                    {props.timeSlotList.length > 0 &&
                      props.workloadData.map((item: any, index: number) => (
                        <Col md={4} sm={6}>
                        <div key={index} className="card m-3 workload-card">
                          <div className="card-header">
                            <h4 className="m-0">Department: {item.departmentName}</h4>
                          </div>
                          <div className="card-body">
                            <div className="mb-4">
                              <FieldLabel
                                htmlfor={`workload_${index}`}
                                labelText="Workload in hour"
                                required="required"
                              // star="*"
                              />
                             <div className="d-flex workload-hour">
                             <FieldTypeText
                                type="number"
                                name={`workload_${index}`}
                                className="form-control"
                                placeholder="Workload in hour"
                              />
                             <p>(per week)</p>
                             </div>
                              <FieldErrorMessage
                                errors={errors[`workload_${index}`]}
                                touched={touched[`workload_${index}`]}
                              />
                            </div>
                            <RenderTimeSlotList item={item.departmentId} />
                          </div>
                        </div>
                      </Col>
                      ))}

                   </Row>
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
           </div>
            )}
          </Formik>
        )}
      </div>
    </React.Fragment>
  );
};

export default WorkLoadComp;
