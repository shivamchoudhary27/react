import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import course_catalogue_ai_image from "../../assets/images/course_catalogue_ai_image.jpg";
import {CoursecataloguecardType} from "../../type/index"
import { Link } from "react-router-dom";

const Coursecataloguecard = ({
  courseName,
  courseId,
  courseTime,
  cartCounter ,
  counterCourseId,
  courseIdStore
}: CoursecataloguecardType) => {
  let modifyDate = new Date(courseTime * 1000);
  let courseDate = modifyDate.toLocaleDateString();
  const [updateBtn, setUpdateBtn] = useState<boolean>(false);
  // Remembering Added Cart Value === >>
  useEffect(() => {
    if (courseIdStore.length > 0) {
      if (courseIdStore.indexOf(courseId) > -1) {
        setUpdateBtn(true);
      }
    }
  }, []);
  // Handle add-to-cart button === >>
  const handleAddToCart = () => {
    setUpdateBtn(true);
    cartCounter(true);
    counterCourseId({ status: true, data: courseId });
  };
  // Handle remove-from-cart button === >>
  const handleRemoveToCart = () => {
    setUpdateBtn(false);
    cartCounter(false);
    counterCourseId({ status: false, data: courseId });
  };
  return (
    <>
      <Row className="ai-course-shadow mb-4">
        <div className="col-sm-3">
          <img
            className="w-100 ai-course-image"
            src={course_catalogue_ai_image}
            alt="ai-course-image"
          />
          <div className="my-3 d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-dark btn-md">Details</button>
            <h5><span className="fa-solid fa-indian-rupee-sign" /> 50000</h5>
          </div>
        </div>
        <div className="col-sm-9 ai-course-details">
          <Row>
            <div className="col-sm-8">
              <p className="ai-course-heading">{courseName}</p>

              <p className="ai-course-review">
                <span className="review-txt">4.2</span>{" "}
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />{" "}
                <span className="review-txt">(2,151)</span>
              </p>

              <p className="ai-course-text">
                <strong>#{courseId}</strong> Build Complete web and hybrid mobile
                solution. Master front end web, hybrid mobile app and server-side
                development in three comprehensive. <Link to="">read more</Link>
              </p>

              <p className="ai-course-date">
                Updated on <b>{courseDate}</b>
              </p>
            </div>
            <div className="col-sm-4 ai-course-get-started-btn">
              <div style={{backgroundColor:"#f2f2f2", padding:"1rem"}}>
                <h5>Key Information</h5>
                <hr />
                <ul style={{listStyle:"none", paddingLeft:"0"}}>
                  <li><strong>Duration:</strong> 3 Year</li>
                  <li><strong>Programme Code:</strong> ST3113</li>
                  <li><strong>Course Type:</strong> Bachelor Degree</li>
                  <li><strong>Mode of Study:</strong> Full Time</li>
                </ul>
              </div>



              {/* {updateBtn === true ? (
                <>
                  <p className="added-update-txt">
                    <span className="fa-solid fa-check" /> Added
                  </p>
                  <p
                    className="added-update-txt"
                    title="remove"
                    onClick={() => {
                      handleRemoveToCart();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="fa-solid fa-xmark" />
                  </p>
                </>
              ) : (
                <div>
                  <button
                    className="ai-course-button" 
                    onClick={() => {
                      handleAddToCart();
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              )} */}
            </div>
          </Row>
        </div>
      </Row>
    </>
  );
};
export default Coursecataloguecard;
