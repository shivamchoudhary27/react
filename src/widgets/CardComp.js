import img from "../assets/images/images.png";
import { Link } from "react-router-dom";

const CardComp = (props) => {
  return (
    <>
      {props.mycoursedata.map((course, index) => (
        <div className="col-xs-3 col-md-3 col-sm-12 col-12" key={course.id}>
          <Link to={`/courseview/${course.id}/${course.fullname}`}>
            <div className="card">
              <img src={img} className="card-img-top" alt="images" />
              <div className="card-body">
                <h5 className="card-title">{course.fullname}</h5>
                <p className="card-text">
                  {course.summary.substr(0, 50).replace(/(<([^>]+)>)/gi, "")}
                  Some quick example text to build on the card title.
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CardComp;
