import View from "./view";
import { useSelector } from "react-redux";
import { pagination } from "../../../utils/pagination";
import { useEffect, useState, useContext } from "react";
import { getData } from "../../../adapters/microservices";
import { getData as getAttendance } from "../../../adapters";
import UserContext from "../../../features/context/user/user";

type Props = {};

const TeacherAttendance = (props: Props) => {
  const dummyData = {
    attendancedetail: [],
    attendancename: "",
    coursename: "",
    enddate: "",
    id: "",
    startdate: "",
    userdetail: [],
  };
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const [apiResponseData, setApiResponseData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });
  const [attendancedata, setAttendanceData] = useState(dummyData);
  const [newAttendancePacket, setNewAttendancePacket] = useState<any>([]);
  const [coursesList, setCoursesList] = useState<any>([]);
  const [courseId, setCourseId] = useState<any>(0);
  const [apiStatus, setApiStatus] = useState("");
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  // call API to get courses list === >>>
  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getData(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setCoursesList(res.data.courses);
        setApiResponseData(res.data);
        if (res.data.length > 0) setCourseId(res.data.courses[0].id);
      }
    });
  }, [currentUserRole.id]);

  useEffect(() => {
    if (courseId > 0) {
      setApiStatus("started");
      const query = {
        wsfunction: "mod_attendance_get_attendance_sessions_report",
        userid: userid,
        courseid: courseId,
        role: currentUserRole.shortName,
      };
      getAttendance(query)
        .then((res) => {
          if (res.data !== "" && res.status === 200) {
            setAttendanceData(res.data);
          }
          setApiStatus("finished");
        })
        .catch((err) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [courseId]);

  useEffect(() => {
    if (
      attendancedata.userdetail !== undefined &&
      attendancedata.attendancedetail !== undefined
    ) {
      const attendancePacket = attendancedata.userdetail
        .map((user) => {
          const attendanceDetail = attendancedata.attendancedetail.find(
            (item) => item.studentid === user.id
          );
          if (attendanceDetail) {
            return {
              email: user.email,
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              A: attendanceDetail.A,
              L: attendanceDetail.L,
              P: attendanceDetail.P,
              attendancename: attendanceDetail.attendancename,
              studentid: attendanceDetail.studentid,
            };
          }
          return null;
        })
        .filter(Boolean); // Remove null entries if no corresponding attendanceDetail was found

      setNewAttendancePacket(attendancePacket);
    } else {
      setNewAttendancePacket([]);
    }
  }, [attendancedata, courseId]);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  return (
    <View
      apiStatus={apiStatus}
      currentUserInfo={currentUserInfo}
      apiResponseData={apiResponseData}
      attendancedata={attendancedata}
      newAttendancePacket={newAttendancePacket}
      getCourseId={getCourseId}
    />
  );
};

export default TeacherAttendance;
