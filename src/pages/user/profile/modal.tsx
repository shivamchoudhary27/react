import React from "react";
import { Modal } from "react-bootstrap";
import EditPicture from "./forms/editPicture";
import ChangePassword from "./forms/changePassword";
import SetPreferences from "./forms/setPreferences";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";


const EditUserProfile = ({
  show,
  onHide,
  userobj,
  timeSlotList,
  workloadList,
  editComponent,
  togglemodalshow,
  updateAddRefresh,
  currentInstitute,
}: any) => {
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {editComponent === "changePassword" && "Update Password"}
            {editComponent === "setPreferences" && "Set Preferences"}
            {editComponent === "picture" && "Update Profile Picture"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editComponent === "changePassword" && (
            <ChangePassword
              userobj={userobj}
              togglemodalshow={togglemodalshow}
              updateAddRefresh={updateAddRefresh}
            />
          )}
          {editComponent === "setPreferences" && (
            <SetPreferences
              timeSlotList={timeSlotList}
              workloadList={workloadList}
              togglemodalshow={togglemodalshow}
              updateAddRefresh={updateAddRefresh}
              currentInstitute={currentInstitute}
            />
          )}
          {editComponent === "picture" && (
            <EditPicture
              userobj={userobj}
              togglemodalshow={togglemodalshow}
              updateAddRefresh={updateAddRefresh}
            />
          )}
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default EditUserProfile;
