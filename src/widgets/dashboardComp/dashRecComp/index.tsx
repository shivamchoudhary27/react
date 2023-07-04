import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import RecCard from "./Cards";
import "./style.scss";
import { getData } from "../../../adapters";
import SkeletonMimic from "./Skeleton";
import Errordiv from "../../alert/errordiv";
import {DashRecCourseType} from "../../../type/index";

function DashRecCourse() {
  const [course, setCourse] = useState();
  const [show, setShow] = useState(false);
  const [recommendedCourses, setRecommandedCourses] = useState<DashRecCourseType>({
    status: 404,
    data: []
  });
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_courses"
    };
    getData(query)
      .then(res => {
        if (res.data.errorcode) {
          setShow(true);
        }
        if (show === false) {
          setCourse(res.data);
          setLoadSkeleton(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const randomProperty = function(obj: never) {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };
  if (course !== undefined && recommendedCourses.status !== 200 && show === false) {
    const totalcourses = Object.keys(course).length;
    const recommendedLength = totalcourses < 4 ? totalcourses : 4;
    let recommended: any[] = [];
    for (let i = 0, j = 0; j < recommendedLength; i += 1) {
      const random: any = randomProperty(course);
      if (!recommended[random.id]) {
        recommended[random.id] = random;
        j += 1;
      }
    }
    recommended = recommended.filter(el => el != null);
    setRecommandedCourses({ status: 200, data: recommended });
  }
  return (
    <>
      <div className="Recommended-course recommended-course-slider" id="recommendedcourseslider">
        <div className="text-center mb-5">
          <h1 className="recommended-course-heading">Recommended Course</h1>
        </div>
        {loadSkeleton === true ? (
          <SkeletonMimic />
        ) : (
          <Row>
            {recommendedCourses.status === 200 &&
            recommendedCourses.data.length > 0 &&
            show == false ? (
              recommendedCourses.data.map(c => <RecCard key={c.id} recourse={c} />)
            ) : (
              <Errordiv cstate={show} msg="Course or activity not accessible.(Not enrolled)" />
            )}
          </Row>
        )}
      </div>
    </>
  );
}
export default DashRecCourse;
