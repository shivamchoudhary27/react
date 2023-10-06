import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EditPicture from "./forms/editPicture";
import ChangePassword from "./forms/changePassword";

const EditUserProfile = ({
  show,
  onHide,
  userobj,
  togglemodalshow,
  updateAddRefresh,
  editComponent
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
            {editComponent === 'changePassword' ? "Update Password" : "Update Profile Picture"}
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
