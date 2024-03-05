import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import Modal from "react-bootstrap/Modal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { postData, putData } from "../../../../../adapters/microservices";
import WaveBottom from "../../../../../assets/images/background/bg-modal.svg";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";

type Props = {
  onHide: any;
  modalShow: any;
  initFormValues: any;
  weekendSlotObj: any;
  toggleModalShow: any;
  currentInstitute: any;
  apiStatus: string;
};

// Formik Yup validation === >>>
const Schema = Yup.object({});

const WeekendSlotModal = (props: Props) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  // modal form contents skeleton === >>>
  const CheckboxSkeleton = () => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(i);
    }
    return (
      <SkeletonTheme baseColor="#F9F5F6" highlightColor="#ECF2FF">
        {arr.map((el, i) => (
          <div key={i}>
            <div className="d-inline-block me-3">
              <Skeleton width={22} height={22} />
            </div>
            <div className="d-inline-block">
              <Skeleton count={1} width={150} height={22} />
            </div>
          </div>
        ))}
        <div className="my-3 text-center">
          <Skeleton width={100} height={40} />
        </div>
      </SkeletonTheme>
    );
  };

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    const trueWeekDays = Object.keys(values).filter((day) => values[day]);
    const formattedWeekDays = { weekDays: trueWeekDays };
    if (props.weekendSlotObj.id === 0) {
      setSubmitting(true);
      postData(`/weekdays/${props.currentInstitute}`, formattedWeekDays)
        .then((res: any) => {
          if (res.data !== "") {
            props.toggleModalShow(false);
          }
          setSubmitting(false);
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add Weekend! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      setSubmitting(true);
      putData(
        `/weekdays/${props.currentInstitute}/${props.weekendSlotObj.id}`,
        formattedWeekDays
      )
        .then((res: any) => {
          if (res.data !== "") {
            props.toggleModalShow(false);
          }
          setSubmitting(false);
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update Weekend! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
  };

  return (
    <Modal
      onHide={props.onHide}
      show={props.modalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-design-wrapper"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.weekendSlotObj.id === 0
            ? `Set Institute Weekend`
            : `Set Department Weekend`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TimerAlertBox
          className="mt-3"
          showAlert={showAlert}
          alertMsg={alertMsg.message}
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
        />
        {/* {props.apiStatus === "started" && <CheckboxSkeleton />} */}
        {/* {props.apiStatus === "finished" && ( */}
          <Formik
            enableReinitialize={true}
            initialValues={props.initFormValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <div>
                    <FieldTypeCheckbox name="monday" checkboxLabel="Monday" />
                  </div>
                  <div>
                    <FieldTypeCheckbox name="tuesday" checkboxLabel="Tuesday" />
                  </div>
                  <div>
                    <FieldTypeCheckbox
                      name="wednesday"
                      checkboxLabel="Wednesday"
                    />
                  </div>
                  <div>
                    <FieldTypeCheckbox
                      name="thursday"
                      checkboxLabel="Thursday"
                    />
                  </div>
                  <div>
                    <FieldTypeCheckbox name="friday" checkboxLabel="Friday" />
                  </div>
                  <div>
                    <FieldTypeCheckbox
                      name="saturday"
                      checkboxLabel="Saturday"
                    />
                  </div>
                  <div>
                    <FieldTypeCheckbox name="sunday" checkboxLabel="Sunday" />
                  </div>
                </div>
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText="Submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        {/* )} */}
      </Modal.Body>
      <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
    </Modal>
  );
};

export default WeekendSlotModal;
