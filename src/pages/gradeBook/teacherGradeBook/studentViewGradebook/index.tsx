import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicData } from "../../../../adapters";
import View from "./view";

type Props = {};

const StudentViewGradebook = (props: Props) => {
  const { courseId, userId, courseName } = useParams<{
    courseId: string;
    userId: string;
    courseName: string;
  }>();

  const [studentData, setStudentData] = useState<any[]>([]);
  const [studentId, setStudentId] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [apiStatus, setApiStatus] = useState<string>("");

  useEffect(() => {
    setApiStatus("started");
    if (courseId === "-1") {
      setTimeout(() => {
        setStudentData([]);
      }, 400);
    } else if (parseInt(courseId) > 0) {
      const query = {
        wsfunction: "local_blapi_teacher_grade_report",
        courseid: parseInt(courseId),
      };
      getPublicData(query)
        .then((res) => {
          if (res.data && res.status === 200) {
            setStudentData(res.data);
            setApiStatus("finished");
          }
        })
        .catch((err) => {
          console.error(err);
          setApiStatus("finished");
        });
    }
  }, [courseId]);
  return (
    <View
      StudentData={studentData}
      setStudentId={setStudentId}
      userId={parseInt(userId)}
      setstatusfilter={setStatusFilter}
      studentId={studentId}
      statusfilter={statusFilter}
      apiStatus={apiStatus}
      courseName={courseName}
    />
  );
};

export default StudentViewGradebook;
