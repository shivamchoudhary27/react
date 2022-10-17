import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import course_catalogue_ai_image from "../../assets/images/course_catalogue_ai_image.jpg";

const Coursecataloguecard = ({
  courseName,
  courseId,
  courseTime,
  cartCounter,
  counterCourseId,
  courseIdStore,
}) => {
  let modifyDate = new Date(courseTime * 1000);
  let courseDate = modifyDate.toLocaleDateString();
  const [updateBtn, setUpdateBtn] = useState(false);

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
        </div>
        <div className="col-sm-9 ai-course-details">
          <Row>
            <div className="col-sm-9">
              <p className="ai-course-heading">{courseName}</p>
              {/* <div dangerouslySetInnerHTML={{ __html: courseSummary }}></div> */}
              <p className="ai-course-text">
                <strong>#{courseId}</strong> Build Complete web and hybrid
                mobile solution. Master front end web, hybrid mobile app and
                server-side development in three comprehensive
              </p>
              <p className="ai-course-date">
                Updated on <b>{courseDate}</b>
              </p>
              <p className="ai-course-review">
                <span className="review-txt">4.2</span>{" "}
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>{" "}
                <span className="review-txt">(2,151)</span>
              </p>
              <p className="ai-course-price">
                <span className="fa-solid fa-indian-rupee-sign"></span>{" "}
                <span className="price">499</span>{" "}
                <span className="old-price">2,499</span>
              </p>
            </div>
            <div className="col-sm-3 ai-course-get-started-btn">
              {updateBtn === true ? (
                <>
                  <p className="added-update-txt">
                    <span className="fa-solid fa-check"></span> Added
                  </p>
                  <p
                    className="added-update-txt"
                    title="remove"
                    onClick={(e) => {
                      handleRemoveToCart(e);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="fa-solid fa-xmark"></span>
                  </p>
                </>
              ) : (
                <div>
                  <button
                    className="ai-course-button"
                    onClick={(e) => {
                      handleAddToCart(e);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </Row>
        </div>
      </Row>
    </>
  );
};

export default Coursecataloguecard;
