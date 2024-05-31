import Swal from "sweetalert2";
import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { deleteData } from "../../../../adapters/microservices";
// import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
type Props = {
  urlArg: any;
  onHide: any;
  filteredTime: any;
  modalFormData: any;
  modalShow: boolean;
  requestTimeSlot: any;
  toggleModalShow: any;
  toggleModalConfirmation: any;
  updateAddRefresh: any;
  changeRequestData: any;
};

const ConfirmationForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const institute_id = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );


  const handleOnClik = () => {
        // if(props.modalFormData?.status === "changeRequest"){
      deleteData(`/${props.urlArg.prgId}/timetable/${props.modalFormData.changeRequestId}/change-request`,{})
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.toggleModalShow(false);
            props.toggleModalConfirmation(false);
            props.updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Change Request successfully deleted.",
            });
          }
        })
        .catch((err: any) => {
          if (err.response.status === 500 || err.response.status === 404) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
    // }
  };

  return (
    <React.Fragment>
      <Modal
        centered
        onHide={props.onHide}
        show={props.modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* {props.isEnrolled(props.minorcourseObj.id)
              ? "Unenrollment Confirmation"
              : props.isWaitlisted(props.minorcourseObj.id)
              ? "Remove Confirmation"
              : props.minorcourseObj.remainingSeats === 0
              ? "Waitlist Confirmation"
              : "Enrollment Confirmation"} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
          <div className="mb-3">

              <span>
                Are you sure you want to be <b>Removed</b> from the
                <b> Waitlist</b> for the{" "}
                course?
              </span>
          </div>

          <div className="modal-buttons">
            <CustomButton
              type="button"
              variant="primary"
              // isSubmitting={isSubmitting}
              onClick={handleOnClik}
              btnText="Yes"
            />{" "}
            <CustomButton
              type="button"
              btnText="No"
              onClick={
                
                () => {props.toggleModalConfirmation(false)}
              }
              variant="outline-secondary"
            />
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmationForm;
