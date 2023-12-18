import View from "./view";
import { useSelector } from "react-redux";
import { pagination } from "../../../utils/pagination";
import { useEffect, useState, useContext } from "react";
import { getData } from "../../../adapters/microservices";
import { getData as getAttendance } from "../../../adapters";
import UserContext from "../../../features/context/user/user";
import { getData as getUsers } from "../../../adapters/coreservices";

type Props = {};

const TeacherAttendance = (props: Props) => {
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const [apiResponseData, setApiResponseData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });
  const [attendancedata, setAttendanceData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
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
        console.log(res.data)
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
      role: "editingteacher",
    };
    getAttendance(query)
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

  // get users API call === >>>
  useEffect(() => {
    setApiStatus("started");
    if (currentInstitute > 0) {
      getUsers(`/${currentInstitute}/users`, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            // console.log(result.data)
            setAllUsers(result.data.items);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [currentInstitute]);

  useEffect(() => {
    const selectedUsers = allUsers.reduce((selected: any, item: any) => {
      if (
        item.roles.some(
          (role: { shortName: string }) => role.shortName === "student"
        )
      ) {
        selected.push(item);
      }
      return selected;
    }, []);
    setSelectedUsers(selectedUsers);
  }, [allUsers]);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  // console.log("attendancedata-----", attendancedata);

  return (
    <View
      apiStatus={apiStatus}
      selectedUsers={selectedUsers}
      attendancedata={attendancedata}
      currentUserInfo={currentUserInfo}
      apiResponseData={apiResponseData}
      getCourseId={getCourseId}
    />
  );
};

export default TeacherAttendance;
