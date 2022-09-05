import React, { useState, useEffect, useContext } from "react";
import { Row } from "react-bootstrap";
import MyCourseCard from "./Cards";
import { getData } from "../../../adapters";
import SkeletonMimic from "./Skeleton";
import ErrorBox from "../../ErrorBox";
import "./style.scss";
import UserContext from '../../../features/context/user/user';

function DashMyCourse(props) {
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const [myCourses, setMyCourses] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState([]);
  const [loadSkeleton, setLoadSkeleton] = useState(true);

  useEffect(() => {
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (userid !== query.userid || res.data.errorcode) {
            setError("Something went wrong");
          } else {
            setMyCourses(res.data);
            setLoadSkeleton(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const dateFormat = Math.floor(Date.now() / 1000);

    if (props.funData === 1) {
      setFilter(
        myCourses.filter(
          (items) => dateFormat > items.startdate && dateFormat < items.enddate
        )
      );
    } else if (props.funData === 2) {
      setFilter(myCourses.filter((items) => dateFormat > items.enddate));
    } else if (props.funData === 3) {
      setFilter(myCourses.filter((items) => dateFormat < items.startdate));
    } else {
      setFilter(myCourses);
    }
  }, [props.funData, myCourses]);

  return (
    <div
      className="course-content course-content-slider"
      id="coursecontentslider"
    >
      {/* <BlockLoader /> */}
      { error !== '' && <ErrorBox msg={error} style={'warning'} />}
      {loadSkeleton === true ? <SkeletonMimic/> :
        <Row className="course-row">
          {filter.map((element) => (
            <div className="col-sm-4" key={element.id}>
              <div className="">
                <MyCourseCard mycoursedata={element} />
              </div>
            </div>
          ))}
        </Row>
      }
      <div className="text-center">
        <button type="button" className="more-course-btn">
          Load More
        </button>
      </div>
    </div>
  );
}

export default DashMyCourse;
