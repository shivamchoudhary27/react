import View from "./view";
import { useSelector } from "react-redux";
import { getData } from "../../../adapters";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../features/context/user/user";
import { getData as getCourses } from "../../../adapters/microservices";

type Props = {};

const StudentAttendance = (props: Props) => {
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const [apiResponseData, setApiResponseData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });
  const [attendancedata, setAttendanceData] = useState([]);
  const [coursesList, setCoursesList] = useState<any>([]);
  const [courseId, setCourseId] = useState<any>(0);
  const [apiStatus, setApiStatus] = useState("");
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  // call API to get courses list === >>>
  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getCourses(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setCoursesList(res.data.courses);
        setApiResponseData(res.data);
        if (res.data.length > 0) setCourseId(res.data.courses[0].id);
      }
    });
  }, [currentUserRole.id]);

  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_sessions_report",
      userid: userid,
      categoryid: 391,
      role: currentUserRole.shortName,
    };
    getData(query)
      .then((res) => {
        if (res.data !== "" && res.status === 200) {
          const data: any = JSON.parse(res.data.attendancedata);
          setAttendanceData(data.coursedata);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  // console.log("attendancedata----", attendancedata)
  // console.log("coursesList----", coursesList)

  return (
    <View
      attendancedata={attendancedata}
      currentUserInfo={currentUserInfo}
      apiResponseData={apiResponseData}
      getCourseId={getCourseId}
    />
    // <p>hello</p>
  );
};

export default StudentAttendance;

const dummyData = [
  {
    date: "30/11/2023",
    sessionType: "offline",
    present: "P",
    late: "L",
    excused: "E",
    absent: "A",
    points: 2,
  },
  {
    date: "30/11/2023",
    sessionType: "offline",
    present: "P",
    late: "L",
    excused: "E",
    absent: "A",
    points: 2,
  },
  {
    date: "30/11/2023",
    sessionType: "offline",
    present: "P",
    late: "L",
    excused: "E",
    absent: "A",
    points: 2,
  },
];
