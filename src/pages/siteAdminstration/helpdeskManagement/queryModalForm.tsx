import Swal from "sweetalert2";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { deleteData } from "../../../adapters/microservices";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import CustomButton from "../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import { capitalizeFirstWords } from "../../../globals/titleCapitalize/capitalizeFirstWords";

type Props = {
  onHide: any;
  modalShow: boolean;
  queryObj: any;
  toggleQueryModalShow: any;
  queryDeleteRefresh: any;
};

const QueryModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleOnClik = () => {
     // delete query call api
    // props.toggleQueryModalShow(true)
    if (props.queryObj.queryId > 0) {
    deleteData(`/enquiry/admin/${props.queryObj.queryId}`)
      .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        props.toggleQueryModalShow(false);
        props.queryDeleteRefresh();
        Swal.fire({
          timer: 3000,
          width: "25em",
          color: "#666",
          icon: "success",
          background: "#e7eef5",
          showConfirmButton: false,
          text: "Query successfully deleted.",
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
  };
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
          {capitalizeFirstWords("Query Delete Confirmation")}
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
                Are you sure you want to {" "}
                <b>{props.queryObj.query}</b> Delete Query ?
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
              onClick={() => props.toggleQueryModalShow(false)}
              variant="outline-secondary"
            />
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default QueryModalForm;
