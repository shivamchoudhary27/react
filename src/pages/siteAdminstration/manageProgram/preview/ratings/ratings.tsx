import React, { useState, useEffect } from "react";
import { postData, getData, deleteData } from "../../../../../adapters/microservices";
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

const programRatingTemplate = {
  averageRating: 0,
  oneStar: 0,
  twoStar: 0,
  threeStar: 0,
  fourStar: 0,
  fiveStar: 0
}
const RatingComp: React.FunctionComponent<IProps> = ({ programid }) => {
  const [newRating, setNewRating] = useState<number>(0);
  const [modalShow, setModalShow] = useState<boolean>(false);
  // const [ratingProgress, setRatingProgress] = useState<number>(0);
  const [ratingBars, setRatingBars] = useState(['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar']);
  // const [netRating, setNetRating] = useState(calculateNetRating(ratingPercentages));
  const [programRating, setProgramRating] = useState(programRatingTemplate);
  const [refreshRating, setRefreshRating] = useState<boolean>(false);

  useEffect(() => {
    getData(`/rating/${programid}`, {})
      .then((result: any) => {
        if (result.status === 200 && result.data.averageRating !== undefined) {
          setProgramRating(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [refreshRating]);

  const giveRatingHandler = () => {
    setModalShow(true);
  };

  const handleRating = (getRatingCount: any) => {
    setNewRating(getRatingCount);

    postData("rating", {
      rating: getRatingCount,
      itemType: "PROGRAM",
      itemId: parseInt(programid),
    })
    .then((res: any) => {
      if (res.status === 200) {
        setRefreshRating((prevState) => !prevState)
        setModalShow(false);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  };

  const resetUserRating = () => {
    setNewRating(0);
    deleteData("rating", {
      itemType: "PROGRAM",
      rating: 0,
      itemId: parseInt(programid),
    })
    .then((res: any) => {
      setRefreshRating((prevState) => !prevState)
      setModalShow(false);
      if (res.status === 200) {
      }
    })
    .catch((err: any) => {
      console.log(err);
      setRefreshRating((prevState) => !prevState)
      setModalShow(false);
    });
  }
  // useEffect(() => {
  //   let getRatingCount = newRating * 20;
  //   setRatingProgress(getRatingCount);
  // }, [newRating]);

  return (
    <React.Fragment>
      <div className="po-section reviewrating-step mt-5">
        <h5 id="po-reviewrating">Review and Rating</h5>
        <Row className="mt-4">
          <Col md="2" className="text-center por-left">
            <h2 className="rating-count">{`${programRating.averageRating.toFixed(2)}`}</h2>
            <StarRating
              totalStars={5}
              currentRating={programRating.averageRating.toFixed(2)}
            />
            <CustomButton
              type="button"
              variant="primary"
              btnText="Give Rating"
              onClick={giveRatingHandler}
            />
          </Col>
          <Col md="10" className=" por-right">
            {ratingBars.map((elem, index) => (
              <div className="mb-2 d-flex align-items-center" key={index}>
                <div
                  className="progress w-25"
                  role="progressbar"
                  aria-label="Basic example"
                >
                  <div
                    className="progress-bar"
                    id={elem}
                    style={{ width: `${Math.floor(programRating[elem])}%` }}
                  ></div>
                </div>
                <StarRating
                  totalStars={5}
                  currentRating={index + 1}
                />
                <strong className="ms-2">{`${Math.floor(programRating[elem])}%`}</strong>
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
        resetUserRating={resetUserRating}
      />
    </React.Fragment>
  );
};

export default RatingComp;
