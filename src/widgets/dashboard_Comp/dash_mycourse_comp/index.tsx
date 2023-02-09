import React, { useState, useEffect, useContext } from "react";
import { Row } from "react-bootstrap";
import MyCourseCard from "./Cards";
import { getData } from "../../../adapters";
import SkeletonMimic from "./Skeleton";
import ErrorBox from "../../ErrorBox";
import "./style.scss";
import UserContext from "../../../features/context/user/user";
import {LinkToggleType, MyCoursesType, FilterType} from "../../../type/index";

function DashMyCourse({ linkToggle }: LinkToggleType) {
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<any>();
  const [filterDataMsg, setFilterDataMsg] = useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  useEffect(() => {
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid
    };
    getData(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          if (userid !== query.userid || res.data.errorcode) {
            setError("Something went wrong");
          } else {
            setMyCourses(res.data);
            setLoadSkeleton(false);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(
    () => {
      const dateFormat = Math.floor(Date.now() / 1000);
      if (linkToggle === 1) {
        const inprogress = myCourses.filter(
          (el: any) => dateFormat > el.startdate && dateFormat < el.enddate
        );
        if (inprogress.length !== 0) {
          setFilter(inprogress);
          setFilterDataMsg(false);
        } else {
          setFilterDataMsg(true);
        }
      } else if (linkToggle === 2) {
        const completed = myCourses.filter((el: { enddate: number; }) => dateFormat > el.enddate);
        if (completed.length !== 0) {
          setFilter(completed);
          setFilterDataMsg(false);
        } else {
          setFilterDataMsg(true);
        }
      } else if (linkToggle === 3) {
        const notStarted = myCourses.filter((el: { startdate: number; }) => dateFormat < el.startdate);
        if (notStarted.length !== 0) {
          setFilter(notStarted);
          setFilterDataMsg(false);
        } else {
          setFilterDataMsg(true);
        }
      } else {
        setFilter(myCourses);
      }
    },
    [linkToggle, myCourses]
  );
  return (
    <>
      <div
        className="course-content course-content-slider"
        id="coursecontentslider"
      >
        {filterDataMsg === true ? (
          <p className="text-center">No records found!</p>
        ) : (
          <div>
            {error !== "" && <ErrorBox msg={error} style={"warning"} />}
            {loadSkeleton === true ? (
              <SkeletonMimic />
            ) : (
              <Row className="course-row">
                {filter.map((element: any) => (
                  <div className="col-sm-4 mobile-course-view" key={element.id}>
                    <div className="">
                      <MyCourseCard
                        mycoursedata={element}
                        currentTab={linkToggle} element={[]} />
                    </div>
                  </div>
                ))}
              </Row>
            )}
            {/* {loadSkeleton === true ? null : (
              <div className="text-center">
                <button type="button" className="more-course-btn">
                  Load More
                </button>
              </div>
            )} */}
          </div>
        )}
      </div>
    </>
  );
}
export default DashMyCourse;
