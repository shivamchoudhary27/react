import React, { useState, useEffect } from "react";
import StarRating from "../../../../../widgets/rating";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import StartRatingModal from "./startRatingModal";
import Review from "./review";
import { Row, Col } from "react-bootstrap";
import "./style.scss";

interface IProps {
  newRating: number;
  handleRating: (params: any) => void;
}

const calculateNetRating = (ratingArray: number[]) => {
  const total = ratingArray.reduce((accumulator : number, currentValue: number) => accumulator + currentValue, 0);
  return (total / ratingArray.length).toFixed(1);
}

const RatingComp: React.FunctionComponent<IProps> = ({
  newRating,
  handleRating,
}: IProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [ratingProgress, setRatingProgress] = useState<number>(0);
  const [ratingPercentages, setRatingPercentages] = useState([4, 3, 4, 3, 5]);
  const [netRating, setNetRating] = useState(calculateNetRating(ratingPercentages))

  const giveRatingHandler = () => {
    setModalShow(true);
  };


  useEffect(() => {
    let getRatingCount = newRating * 20;
    setRatingProgress(getRatingCount);
  }, [newRating]);

  return (
    <React.Fragment>
      <div className="po-section reviewrating-step mt-5">
        <h5 id="po-reviewrating">Review and Rating</h5>
        <Row className="mt-4">
          <Col md="2" className="text-center por-left">
            <h2 className="rating-count">{`${netRating}`}</h2>
            <StarRating
              totalStars={5}
              currentRating={netRating}
            />
            <CustomButton
              type="button"
              variant="primary"
              btnText="Give Rating"
              onClick={giveRatingHandler}
            />
          </Col>
          <Col md="10" className=" por-right">
            {[1, 2, 3, 4, 5].map((elem, index) => (
              <div className="mb-2 d-flex align-items-center" key={index}>
                <div
                  className="progress w-25"
                  role="progressbar"
                  aria-label="Basic example"
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${((ratingPercentages[index])/5) * 100}%` }}
                  ></div>
                </div>
                <StarRating
                  totalStars={5}
                  currentRating={ratingPercentages[index]}
                  // onStarClick={handleRating}
                />
                <strong className="ms-2">{`${((ratingPercentages[index])/5) * 100}%`}</strong>
              </div>
            ))}
          </Col>
        </Row>
        <Review />
      </div>
      <StartRatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        newRating={newRating}
        handleRating={handleRating}
      />      
    </React.Fragment>
  );
};

export default RatingComp;