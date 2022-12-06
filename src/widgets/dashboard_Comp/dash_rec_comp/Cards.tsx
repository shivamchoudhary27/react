import React from "react";
import "./style.scss";
import img from "../../../assets/images/images.png";
function RecCard(props) {
  const unixTime = props.recourse.startdate;
  const date = new Date(unixTime * 1000);
  const startDate = date.toLocaleDateString("en-IN");
  return (
    <>
      <div className="col-sm-3 mb-4 mobile-recommend-course">
        <img src={img} alt="digitalmarketingcourse.png" className="w-100" />
        <div className="course-details">
          <h5 className="digital-market-course">{props.recourse.fullname.substr(0, 20)}...</h5>
          <p className="digital-market-course-details">{props.recourse.summary.replace(/(<([^>]+)>)/gi, "").substr(0, 70)}.....</p>
          <p className="course-date">Start date {startDate}</p>
          <p className="">
            4.0
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
          </p>
        </div>
      </div>
    </>
  );
}
export default RecCard;
