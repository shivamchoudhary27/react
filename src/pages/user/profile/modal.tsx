import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EditPicture from "./forms/editPicture";
import ChangePassword from "./forms/changePassword";
import SetPreferences from "./forms/setPreferences";

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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {editComponent === 'changePassword' ? "Update Password" : editComponent === 'setPreferences' ? 'Set Preferences' : "Update Profile Picture"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editComponent === 'changePassword' ?
            <ChangePassword
              userobj={userobj}
              togglemodalshow={togglemodalshow}
              updateAddRefresh={updateAddRefresh}
            />
            :
            editComponent === 'setPreferences' ? 
              <SetPreferences 
                timeSlotList={timeSlotList}
                workloadList={workloadList}
                togglemodalshow={togglemodalshow}
                updateAddRefresh={updateAddRefresh}
                currentInstitute={currentInstitute}
              />
            :
            <EditPicture 
                userobj={userobj}
                togglemodalshow={togglemodalshow}
                updateAddRefresh={updateAddRefresh}
            /> 
          }
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default EditUserProfile;
