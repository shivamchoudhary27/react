import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../../../utils/pagination";
import { putData } from "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import { getData } from "../../../../../adapters/microservices";

type Props = {
  workloadData: any;
  filterUpdate: any;
  // setFilterUpdate: any;
  currentInstitute: any;
};

const initialValues = {
  // Workload: "",
};

const WorkLoadComp = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { userId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [timeSlotList, setTimeSlotList] = useState([])
  const [alertMsg, setAlertMsg] = useState({message: "", alertBoxColor: "",});
  const [startRendering, setStartRendering] = useState(false);
  const [fetchLenght, setFetchLenght] = useState(props.workloadData.length);
  
  // get time slot list according to department === >>>
  useEffect(() => {
    let arr: any[] | ((prevState: never[]) => never[]) = [];
    let workloadItems = props.workloadData.length;
    let workloadSlotsFetched = 0;
    props.workloadData.map((id: any, index: number) => {
      if (props.currentInstitute > 0) {
        let endPoint = `/${props.currentInstitute}/timetable/timeslot?departmentId=${id.departmentId}`;
        getData(endPoint, props.filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            arr.push(result.data.items)
            ++workloadSlotsFetched;
          }
          // setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          ++workloadSlotsFetched;
          // setApiStatus("finished");
        });
      }
    })
    if (workloadItems == workloadSlotsFetched) {
      setTimeSlotList(arr);
    }
  }, [props.workloadData])
  

  useEffect(() => {
    props.updateForceRendering();
    // setStartRendering(true)
  }, [timeSlotList]);
  // console.log(timeSlotList)

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

  // console.log(props.workloadData)

  return (
    <React.Fragment>
      {/* {props.workloadData.length > 0 ? (
        <p>{`User: ${props.workloadData[0].userFirstName} ${props.workloadData[0].userLastName} (${props.workloadData[0].userEmail})`}</p>
      ) : (
        ""
      )} */}
      {/* {startRendering === true && */}
      
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
              {timeSlotList.length == fetchLenght && props.workloadData.map((item: any, index: number) => (
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
                  {/* {item.slots.length > 0 &&
                    item.slots.map((el: any, index: number) => (
                      <div className="mb-3" key={index}>
                        <FieldTypeCheckbox
                          name={`slotid_${el.id}`}
                          checkboxLabel={`${el.startTime} to ${el.endTime}`}
                        />
                      </div>
                  ))} */}

                  { 
                    timeSlotList.find((slotList: any) => (
                      (slotList.departmentId == item.departmentId) &&
                      <div key={slotList.id} className="mb-3">
                        <FieldTypeCheckbox
                          name={`slotid_${slotList.id}`}
                          checkboxLabel={`${slotList.startTime} to ${slotList.endTime}`}
                        />
                      </div>    
                    ))
                  }

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
    {/* } */}
    </React.Fragment>
  );
};

export default WorkLoadComp;
