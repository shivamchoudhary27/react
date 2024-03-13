import "./style.scss";
import axios from "axios";
import Review from "./review";
import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import StarRating from "../../../../widgets/rating";
import config from "../../../../utils/config";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import StartRatingModal from "./startRatingModal";
import { getData, deleteData, postData, putData } from "../../../../adapters/microservices";
import { deleteData as deleteDataPublic, postData as postDataPublic, putData as putDataPublic} from "../../../../adapters";
import UserContext from "../../../../features/context/user/user";

interface IProps {
  newRating: number;
  handleRating: (params: any) => void;
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
  currentUserRating: null,
  userEnroll: null,
}

const RatingComp: React.FunctionComponent<IProps> = ({ programid }) => {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [programRating, setProgramRating] = useState(programRatingTemplate);
  const [refreshRating, setRefreshRating] = useState<boolean>(false);
  const ratingBars = ['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar'];

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  console.log(isLoggedIn)

  // const apiDiff = isLoggedIn ? "/rating/" : ";
 


  useEffect(() => {
    const endPoint = `${config.JAVA_API_URL}/public/rating/${programid}`;
   
    if (isLoggedIn === true) {
      getData(`/rating/${programid}`, {})
          .then((result: any) => {
              if (result.status === 200 && result.data.averageRating !== undefined) {
                  setProgramRating(result.data);
                  setCurrentRating(result.data.currentRating);
              }
          })
          .catch((err: any) => {
              console.log(err);
          })}else{  
            axios.get(endPoint)
            .then((result: any) => {
              if (result.status === 200 && result.data.averageRating !== undefined) {
                console.log(result.data)
                setProgramRating(result.data);
                setCurrentRating(result.data.currentRating);
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
          }
  }, [refreshRating]);


  const giveRatingHandler = () => {
    setModalShow(true);
  };

  const handleRating = (getRatingCount: any) => {
    setCurrentRating(getRatingCount);
    if (programRating.ratingId === null || programRating.ratingId === 0) {
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
    } else {
      putData(`rating/${programRating.ratingId}`, {
        rating: getRatingCount,
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
    }
  };

  const resetUserRating = () => {
    setCurrentRating(0);
    deleteData(`rating/${programRating.ratingId}`)
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
            {programRating.userEnroll != false && programRating.userEnroll != null &&
            <CustomButton
              type="button"
              variant="primary"
              btnText="Give Rating"
              onClick={giveRatingHandler}
            />
            }
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
      <StartRatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        newRating={currentRating}
        handleRating={handleRating}
        resetUserRating={resetUserRating}
      />
    </React.Fragment>
  );
};

export default RatingComp;
