import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EditProfile from "./forms/editProfile";
import EditPicture from "./forms/editPicture";

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
            {editComponent === 'profile' ? "Update Profile Information" : "Update Profile Picture"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editComponent === 'profile' ?
            <EditProfile
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
