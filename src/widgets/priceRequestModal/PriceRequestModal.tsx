import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import RequestImage from "../../assets/images/price-request.png";
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
            <input type="text" placeholder="Enter Your Email" />
            <Button variant="primary">Submit</Button>
        </div>
        <div className="request-image">
            <img src={RequestImage} alt="Price Request" />
        </div>
      </div>
      </Modal.Body>
    </Modal>
  );
};

export default PriceRequestModal;
