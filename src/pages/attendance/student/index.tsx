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
  const [allAttendanceSessionRecords, setAllAttendanceSessionRecords] =
    useState<any>([]);
  const [courseId, setCourseId] = useState<any>(0);
  const [apiStatus, setApiStatus] = useState("");
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);
  const [totalPointAndPercentage, setTotalPointAndPercentage] = useState({
    totalPoints: 0,
    percentage: 0,
  });

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

  // call API to get student attendance report === >>
  useEffect(() => {
    if (courseId > 0) {
      const query = {
        wsfunction: "mod_attendance_get_attendance_sessions_report",
        userid: userid,
        courseid: courseId,
        role: currentUserRole.shortName,
      };
      setApiStatus("started");
      getData(query)
        .then((res) => {
          if (res.data !== "" && res.status === 200) {
            if (res.data.sessionrecords !== undefined) {
              setAttendanceData(res.data.sessionrecords);
            } else {
              setAttendanceData([]);
            }
            setAllAttendanceSessionRecords(res.data);
          }
          setApiStatus("finished");
        })
        .catch((err) => {
          console.log(err);
          setApiStatus("finished");
        });
    } else {
      console.log("course id must not be null---");
    }
  }, [courseId]);

  // calculate total points obtained and percentage === >>
  useEffect(() => {
    if (attendancedata && attendancedata.length > 0) {
      const totalPoints = attendancedata.reduce((accumulator, point: any) => {
        let valPoint = point.point === undefined ? 2 : point.point;
        return accumulator + Math.round(valPoint);
      }, 0);

      let percentage = 0;
      if (totalPoints !== 0) {
        percentage = (2 / totalPoints) * 100;
      }

      setTotalPointAndPercentage({
        totalPoints: totalPoints,
        percentage: percentage,
      });
    } else {
      setTotalPointAndPercentage({
        totalPoints: 0,
        percentage: 0,
      });
    }
  }, [attendancedata, courseId]);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  return (
    <View
      apiStatus={apiStatus}
      attendancedata={attendancedata}
      currentUserInfo={currentUserInfo}
      apiResponseData={apiResponseData}
      getCourseId={getCourseId}
      allAttendanceSessionRecords={allAttendanceSessionRecords}
      totalPointAndPercentage={totalPointAndPercentage}
    />
  );
};

export default StudentAttendance;
