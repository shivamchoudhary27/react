import "./style.scss";
import axios from "axios";
import Review from "./review";
import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import StarRating from "../../../../widgets/rating";
import config from "../../../../utils/config";

interface IProps {
  programid: any
} 

const calculateNetRating = (ratingArray: number[]) => {
  const total = ratingArray.reduce((accumulator : number, currentValue: number) => accumulator + currentValue, 0);
  return (total / ratingArray.length).toFixed(1);
}

const roundToWhole = (number : number) => {
  return ((number % 1) >= 0.5) ? Math.ceil(number) : Math.floor(number);
}

const programRatingTemplate = {
  ratingId: null,
  averageRating: 0,
  oneStar: 0,
  twoStar: 0,
  threeStar: 0,
  fourStar: 0,
  fiveStar: 0,
  currentRating: 0,
  currentUserRating: null
}

const RatingComp: React.FunctionComponent<IProps> = ({ programid }) => {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [programRating, setProgramRating] = useState(programRatingTemplate);
  const [refreshRating, setRefreshRating] = useState<boolean>(false);
  const ratingBars = ['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar'];

  useEffect(() => {
    axios.get(`${config.JAVA_API_URL}/public/rating/${programid}`).then((res: any) => {
      if (res.status === 200 && res.data.averageRating !== undefined) {
        setProgramRating(res.data);
        setCurrentRating(res.data.currentRating);
      }
    }).catch((err: any) => {
        console.log(err);
    });
  }, [refreshRating, programid]);

  return (
    <React.Fragment>
      <div className="po-section reviewrating-step mt-5">
        <h5 id="po-reviewrating">Review and Rating</h5>
        <Row className="mt-4">
          <Col md="2" className="text-center por-left">
            <h2 className="rating-count">{`${programRating.averageRating.toFixed(2)}`}</h2>
            <StarRating
              totalStars={5}
              currentRating={roundToWhole(programRating.averageRating)}
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
                <strong className="ms-2">{programRating[elem] > 0 ? `${Math.floor(programRating[elem])}%` : '0%'}</strong>
              </div>
            ))}
          </Col>
        </Row>
        <Review />
      </div>
    </React.Fragment>
  );
};

export default RatingComp;
