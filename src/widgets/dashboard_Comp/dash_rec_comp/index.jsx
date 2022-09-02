import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import RecCard from "./Cards";
import "./style.scss";
import { getData } from "../../../adapters";
import SkeletonMimic from "./Skeleton";

function DashRecCourse() {
  const [course, setCourse] = useState();
  const [recommendedCourses, setRecommandedCourses] = useState({
    status: 404,
    data: [],
  });
  const [loadSkeleton, setLoadSkeleton] = useState(true);

  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_courses",
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setCourse(res.data);
          setLoadSkeleton(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const randomProperty = function (obj) {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  if (course !== undefined && recommendedCourses.status !== 200) {
    const totalcourses = Object.keys(course).length;
    const recommendedLength = totalcourses < 4 ? totalcourses : 4;
    let recommended = [];

    for (let i, j = 0; j < recommendedLength; i += 1) {
      const random = randomProperty(course);
      if (!recommended[random.id]) {
        recommended[random.id] = random;
        j += 1;
      }
    }

    recommended = recommended.filter((el) => el != null);

    setRecommandedCourses({ status: 200, data: recommended });
  }

  return (
    <div
      className="Recommended-course recommended-course-slider"
      id="recommendedcourseslider"
    >
      <div className="text-center mb-5">
        <h1 className="recommended-course-heading">Recommended Course</h1>
      </div>
      {loadSkeleton === true ? (
        <SkeletonMimic />
      ) : (
        <Row>
          {recommendedCourses.status === 200 &&
            recommendedCourses.data.length > 0 &&
            recommendedCourses.data.map((c) => (
              <RecCard key={c.id} recourse={c} />
            ))}
        </Row>
      )}
    </div>
  );
}

export default DashRecCourse;
