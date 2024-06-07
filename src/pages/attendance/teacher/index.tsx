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
    coursedata: {},
    dateheaders: "",
    userdata: [],
  };
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const [apiResponseData, setApiResponseData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });
  const [attendancedata, setAttendanceData] = useState(dummyData);
  const [attTableHeader, setAttTableHeader] = useState([]);
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
    if (currentUserRole.id !== undefined && currentUserRole.id > 0) {
      let endPoint = `/${currentUserRole.id}/dashboard`;
      getData(endPoint, {}).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCoursesList(res.data.courses);
          setApiResponseData(res.data);
          if (res.data.length > 0) setCourseId(res.data.courses[0].id);
        }
      });
    }
  }, [currentUserRole.id]);

  useEffect(() => {
    setApiStatus("started");
    if (courseId > 0) {
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
            if (res.data.dateheaders !== undefined) {
              const headerArr = res.data.dateheaders
                .split(",")
                .sort((a: number, b: number) => b - a);
              const filterHeaderDate = headerArr.filter((el: any) => {
                if (res.data.coursedata.enddate !== "0") {
                  // return (
                  //   el >= res.data.coursedata.startdate &&
                  //   el <= res.data.coursedata.enddate
                  // );
                  return el >= res.data.coursedata.startdate;
                } else {
                  return el >= res.data.coursedata.startdate;
                }
              });
              setAttTableHeader(filterHeaderDate);
            } else {
              setAttendanceData({
                ...attendancedata,
                userdata: [],
              });
              setAttTableHeader([]);
            }
          }
          setApiStatus("finished");
        })
        .catch((err) => {
          console.log(err);
          setApiStatus("finished");
        });
    }else{
      setApiStatus("finished");
    }
  }, [courseId]);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const totalPages = Math.ceil(attendancedata.userdata.length / filterUpdate.pageSize);

  const currentPosts = attendancedata.userdata.slice(
    filterUpdate.pageNumber * filterUpdate.pageSize,
    filterUpdate.pageNumber * filterUpdate.pageSize + filterUpdate.pageSize
  );

  console.log(apiStatus, 'status')

  return (
    <View
      apiStatus={apiStatus}
      currentUserInfo={currentUserInfo}
      apiResponseData={apiResponseData}
      attTableHeader={attTableHeader}
      attendancedata={currentPosts}
      courseDetails={attendancedata.coursedata}
      newAttendancePacket={newAttendancePacket}
      getCourseId={getCourseId}
      newPageRequest={newPageRequest}
      totalPages={totalPages}
      filterUpdate={filterUpdate}
    />
  );
};

export default TeacherAttendance;
