import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GradeTable from "./table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import BottomWave from "../../../../assets/images/background/bg-bottom.svg";
import FilterProgramDropdownStudent from "../../teacherGradeBook/studentViewGradebook/filters";
import { getPublicData } from "../../../../adapters";

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
    <>
      <Header />
      <HeaderTabs activeTab="gradebook" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Gradebook", path: "/gradebook" },
          { name: courseName, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Gradebook: ${courseName}`}
            gobacklink="/gradebook"
          />
          <FilterProgramDropdownStudent
            StudentData={studentData}
            setStudentId={setStudentId}
            userId={parseInt(userId)}
            setstatusfilter={setStatusFilter}
          />
          <GradeTable
            studentId={studentId}
            statusfilter={statusFilter}
            apiStatus={apiStatus}
          />
        </Container>
      </div>
      <Footer />
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </>
  );
};

export default StudentViewGradebook;
