import Swal from "sweetalert2";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postData } from "../../adapters/microservices";
import { deleteData } from "../../adapters/microservices";
import TimerAlertBox from "../../widgets/alert/timerAlert";
import CustomButton from "../../widgets/formInputFields/buttons";
import WaveBottom from "../../assets/images/background/bg-modal.svg";

type Props = {
  onHide: any;
  updateAddRefresh: any;
  modalShow: boolean;
  minorcourseObj: any;
  toggleModalShow: any;
};

const ModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const institute_id = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const userId = JSON.parse(localStorage.getItem("userInfo")).userInfo.uid;

  const handleOnClik = () => {
    if(props.minorcourseObj.enrolled === false){ 
      postData(`/${institute_id}/enroll/${props.minorcourseObj.id}`, {})
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
            message: "User is already enrolled in this course",
            alertBoxColor: "danger",
          });
        }
      });
    }
    else{
        deleteData(`/${institute_id}/unenroll/${props.minorcourseObj.id}/${userId
    }`,{})
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
          text: "User successfully unenroll.",
        });
      }
    })
    .catch((err: any) => {
        console.log(err);
    });
    }
   
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
           {props.minorcourseObj.enrolled === true ? "Unenrollment Confirmation" : "Enerollment Confirmation"}
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
            {props.minorcourseObj.enrolled === true 
              ? <span>Are you sure you want to <b>unenroll</b> in <b>{props.minorcourseObj.name}</b> course?</span> 
              : <span>Are you sure you want to <b>enroll</b> in <b>{props.minorcourseObj.name}</b> course?</span>}
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
              onClick={() => props.toggleModalShow(false)}
              variant="outline-secondary"
            />
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
