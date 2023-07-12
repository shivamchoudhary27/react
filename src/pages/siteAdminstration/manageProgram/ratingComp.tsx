import React, { useState, useEffect } from "react";
import StarRating from "../../../widgets/rating";
import CustomButton from "../../../widgets/formInputFields/buttons";
import StartRatingModal from "./startRatingModal";
import Review from "./review";

interface IProps {
  newRating: number;
  handleRating: (params: any) => void;
}

const RatingComp: React.FunctionComponent<IProps> = ({
  newRating,
  handleRating,
}: IProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [ratingProgress, setRatingProgress] = useState<number>(0);

  const giveRatingHandler = () => {
    setModalShow(true);
  };

  useEffect(() => {
    let getRatingCount = newRating * 20;
    setRatingProgress(getRatingCount);
  }, [newRating]);

  return (
    <React.Fragment>
      <div className="po-section studentfeedback-step mt-5">
        <h5 id="po-studentfeedback">Student Feedback</h5>
        <h1>{`${newRating}.0`}</h1>
        <StarRating
          totalStars={5}
          currentRating={newRating}
          onStarClick={handleRating}
        />
      </div>

      {[1, 2, 3, 4, 5].map((elem, index) => (
        <div className="my-2" key={index}>
          <div
            className="progress"
            role="progressbar"
            aria-label="Basic example"
          >
            <div
              className="progress-bar"
              style={{ width: `${ratingProgress}%` }}
            ></div>
          </div>
          <StarRating
            totalStars={5}
            currentRating={newRating}
            onStarClick={handleRating}
          />
          <p>{`${ratingProgress}%`}</p>
        </div>
      ))}
      <CustomButton
        type="button"
        variant="primary"
        btnText="Give Rating"
        onClick={giveRatingHandler}
      />
      <StartRatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        newRating={newRating}
        handleRating={handleRating}
      />
      <Review />
    </React.Fragment>
  );
};

export default RatingComp;
