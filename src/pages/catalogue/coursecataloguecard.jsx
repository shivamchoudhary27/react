import React from "react";
import { Row } from "react-bootstrap";
import course_catalogue_ai_image from "../../assets/images/course_catalogue_ai_image.jpg";

const Coursecataloguecard = (props) => {
    let modifyDate = new Date(props.categoryTime * 1000);
    let categoryDate = modifyDate.toLocaleDateString();

  return (
    <>
    {

    }
      <Row className="ai-course-shadow mb-4">
        <div className="col-sm-3">
          <img
            className="w-100 ai-course-image"
            src={course_catalogue_ai_image}
            alt="ai-course-image"
          />
        </div>
        <div className="col-sm-9 ai-course-details">
          <Row>
            <div className="col-sm-9">
              <p className="ai-course-heading">{props.categoryName}</p>
              {/* <div dangerouslySetInnerHTML={{ __html: props.categoryDescription }}></div> */}
              <p className="ai-course-text">
                <strong>#{props.categoryId}</strong>{" "}
                Build Complete web and hybrid mobile solution. Master front end
                web, hybrid mobile app and server-side development in three
                comprehensive
              </p>
              <p className="ai-course-date">
                Updated on <b>{categoryDate}</b>
              </p>
              <p className="ai-course-review">4.2 (2,151)</p>
            </div>
            <div className="col-sm-3 ai-course-get-started-btn">
              <div>
                <button className="ai-course-button">Get Started</button>
              </div>
            </div>
          </Row>
        </div>
      </Row>
    </>
  );
};

export default Coursecataloguecard;
