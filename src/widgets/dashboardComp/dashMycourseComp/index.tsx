import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import MyCourseCard from "./Cards";
import { getData } from "../../../adapters";
import SkeletonMimic from "./Skeleton";
import ErrorBox from "../../ErrorBox";
import "./style.scss";
import UserContext from "../../../features/context/user/user";

function DashMyCourse({ linkToggle }: any) {
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
      userid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (userid !== query.userid || res.data.errorcode) {
            setError("Something went wrong");
          } else {
            setMyCourses(res.data);
            setLoadSkeleton(false);
            localStorage.setItem("enroled_courses", JSON.stringify(res.data));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
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
      const completed = myCourses.filter(
        (el: { enddate: number }) => dateFormat > el.enddate
      );
      if (completed.length !== 0) {
        setFilter(completed);
        setFilterDataMsg(false);
      } else {
        setFilterDataMsg(true);
      }
    } else if (linkToggle === 3) {
      const notStarted = myCourses.filter(
        (el: { startdate: number }) => dateFormat < el.startdate
      );
      if (notStarted.length !== 0) {
        setFilter(notStarted);
        setFilterDataMsg(false);
      } else {
        setFilterDataMsg(true);
      }
    } else {
      setFilter(myCourses);
    }
  }, [linkToggle, myCourses]);
  return (
    <>        
      {filterDataMsg === true ? (
        <p className="alert alert-info text-center">No records found!</p>
      ) : (
        <Container fluid>
          {error !== "" && <ErrorBox msg={error} style={"warning"} />}
          {loadSkeleton === true ? (
            <SkeletonMimic />
          ) : (
            <Row className="course-widgets">
              {filter.map((element: any) => (
                <div className="col-sm-4 mobile-course-view mb-4" key={element.id}>
                    <MyCourseCard
                      mycoursedata={element}
                      currentTab={linkToggle}
                      element={[]}
                    />
                </div>
              ))}
            </Row>              
          )} 
          </Container>         
        )}        
    </>
  );
}
export default DashMyCourse;
