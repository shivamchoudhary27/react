import Swal from "sweetalert2";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postData } from "../../../../../adapters/microservices";
import { deleteData } from  "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
// import WaveBottom from "../../assets/images/background/bg-modal.svg";

type Props = {
  onHide: any;
  updateAddRefresh: any;
  modalShow: boolean;
  toggleModalShow: any;
  UserModalInfo: any;
};

const ModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const institute_id = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

console.log(props.UserModalInfo.userId)

  const handleOnClik = () => {
    
      postData(
        `/${institute_id}/enroll/${props.UserModalInfo.userId}/${props.UserModalInfo.courseId}`,
        {}
      )
        .then((res: any) => {
          if (res.data != "" && res.status === 201) {
            props.toggleModalShow(false);
            props.updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "User successfully enrolled.",
            });
          }
        })
        .catch((err: any) => { 
          if (err.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
  }

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
            {"Enrollment Confirmation"}
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
           {  <span>
                Are you sure you want to enroll {" "}
                <b>{props.UserModalInfo.fullName}<br/>{`(${props.UserModalInfo.email})`}</b> {" "} in course?
              </span> 
              }
          </div>

          <div className="modal-buttons">
            <CustomButton
              type="button"
              variant="primary"
              onClick={handleOnClik}
              btnText="Yes"
            />{" "}
            <CustomButton
              type="button"
              btnText="No"
              onClick={() => props.toggleModalShow(false)}
              variant="outline-secondary"
            />
          </div>
        </Modal.Body>
        {/* <img src={WaveBottom} alt="WaveBottom" className="wavebg" /> */}
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
