import "./style.scss";
import React, { Suspense } from "react";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { isMobile, isDesktop } from "react-device-detect";

// const Browser = React.lazy(() => wait(2000).then(() => import("./view/browser")))

// const wait = (time: number | undefined) => {
//   return new Promise<void>(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, time)
//   })
// }

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
  apiStatusCourse: string
  gradeData: any;
  badgesData: any;
};

const EnrolCoursesList: React.FC<Props> = (props) => {
  // const [coursesList, setCoursesList] = useState([]);
  // const id = localStorage.getItem("userid");
  // const url = `https://demo.learn.ballisticlearning.com/webservice/rest/server.php?wstoken=7243942b15e0ffe89c1cf7c432863232&wsfunction=core_enrol_get_users_courses &moodlewsrestformat=json&userid=${id}`;

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((res: any) => {
  //       setCoursesList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile
          apiStatusCourse={props.apiStatusCourse}
          coursesList={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          gradeData={props.gradeData}
          badgesData={props.badgesData}
        />
      ) : isDesktop ? (
        // <Suspense fallback={<h3>Loading...</h3>}>
            <Browser
              apiStatusCourse={props.apiStatusCourse}
              coursesList={props.userCoursesData}
              enrolCoreCoursesObj={props.enrolCoreCoursesObj}
              gradeData={props.gradeData}
              badgesData={props.badgesData}
            />
        // </Suspense>
      ) : (
        <Browser
          apiStatusCourse={props.apiStatusCourse}
          coursesList={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          gradeData={props.gradeData}
          badgesData={props.badgesData}
        />
      )}
    </React.Fragment>
  );
};

export default EnrolCoursesList;
