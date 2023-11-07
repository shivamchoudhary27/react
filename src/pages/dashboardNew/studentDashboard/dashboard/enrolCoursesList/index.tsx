import "./style.scss";
import React from "react";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
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
          coursesList={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
        />
      ) : isDesktop ? (
        <Browser
          coursesList={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
        />
      ) : (
        <Browser
          coursesList={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
        />
      )}
    </React.Fragment>
  );
};

export default EnrolCoursesList;
