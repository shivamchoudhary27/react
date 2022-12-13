import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/images.png";
import UserContext from "../features/context/user/user";

function CardComp(props: { mycoursedata: any[]; }) {
  const userCtx = useContext(UserContext);
  const userToken = userCtx.token;
  return (
    <>
      {props.mycoursedata.map((course, index) => (
        <div className="col-xs-3 col-md-3 col-sm-12 col-12" key={course.id}>
          <div className="card">
            <Link to={`/courseview/${course.id}/${course.fullname}`}>
              {course.overviewfiles.length !== 0 ? (
                <img src={`${course.overviewfiles[0].fileurl}?token=${userToken}`} className="card-img-top" alt="images" />
              ) : (
                <img src={img} className="card-img-top" alt="images" />
              )}
            </Link>
            <div className="card-body">
              <Link to={`/courseview/${course.id}/${course.fullname}`}>
                <h5 className="card-title">{course.fullname}</h5>
              </Link>
              <p className="card-text">
                {course.summary.replace(/(<([^>]+)>)/gi, "").substr(0, 80).length !== ""
                  ? `${course.summary.replace(/(<([^>]+)>)/gi, "").substr(0, 100)}.....`
                  : "Some quick example text for course description."}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default CardComp;
