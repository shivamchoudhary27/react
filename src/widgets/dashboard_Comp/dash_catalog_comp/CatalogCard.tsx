import React from "react";
import "./style.scss";
import {CatalogCardType} from "../../../type/index";

function CatalogCard(props: CatalogCardType) {
  return (
    <div className="col-sm-3 gy-3">
      <div className="course-inner-block">
        <div className="course-catalog-icon">
          <i className="fa-brands fa-react" />
        </div>
        <div className="course-details">
          <p className="digital-market-course">
            {props.catName}
            <br />
            {props.courseCount === 0 ? (
              <span>{props.courseCount} course</span>
            ) : (
              <span>{props.courseCount} courses</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
export default CatalogCard;
