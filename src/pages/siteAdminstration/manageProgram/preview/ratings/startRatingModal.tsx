import React from "react";
import { Modal } from "react-bootstrap";
import StarRating from "../../../../../widgets/rating";
import { Button } from "react-bootstrap";


interface IProps {
  show: boolean;
  onHide: () => void;
  handleRating: (params: any) => void;
  newRating: number;
}

const StartRatingModal: React.FunctionComponent<IProps> = ({
  show,
  onHide,
  handleRating,
  newRating,
  resetUserRating
}: IProps) => {

  const resetRatingHandler = () => {
    resetUserRating();
  }

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="starrating-modal">
            <StarRating
              totalStars={5}
              currentRating={newRating}
              onStarClick={handleRating}
            />
          </div>   
          <Button
            variant="outline-secondary"
            type='reset'
            onClick={resetRatingHandler}
          >
            Reset Rating
          </Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default StartRatingModal;
