import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import StarRating from "../../../../widgets/rating";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";

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
        className="modal-design-wrapper"
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
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default StartRatingModal;
