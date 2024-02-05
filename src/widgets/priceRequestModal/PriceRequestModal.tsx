import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import RequestImage from "../../assets/images/price-request.png";
import MailIcon from "../../assets/images/icons/mail.svg";
import WaveBottom from "../../assets/images/background/bg-modal.svg";
import "./style.scss";

const PriceRequestModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="pricerequest-wrapper">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <div className="d-flex p-2 align-items-center gap-5">
        <div className="d-flex flex-column gap-2 requestmodal-content">
            <h4>Price Upon Request</h4>
            <div className="d-flex flex-row gap-2">
              <img src={MailIcon} alt="Mail" className="img img-fluid" />
              <a href="mailto:enquiry@ballisticlearning.com">enquiry@ballisticlearning.com</a>
            </div>
        </div>
        <div className="request-image">
            <img src={RequestImage} alt="Price Request"/>
        </div>
      </div>
      </Modal.Body>
      <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
    </Modal>
  );
};

export default PriceRequestModal;
