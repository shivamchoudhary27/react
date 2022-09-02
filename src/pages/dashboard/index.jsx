import React, { useState } from 'react';
import Sidebar from '../sidebar';
import Header from '../header';
import DashMyCourse from '../../widgets/dashboard_Comp/dash_mycourse_comp';
// import Course from "../../component/Course";
import useUserinfo from '../../features/hooks/userinfo';
import PageLoader from '../../widgets/loader/pageloader';
import DashCatalog from '../../widgets/dashboard_Comp/dash_catalog_comp';
import DashRecCourse from '../../widgets/dashboard_Comp/dash_rec_comp';
import './style.scss';

function Dashboard() {
  const res = useUserinfo();
  const [inprog, setInprog] = useState(1);

  if (res === 'loading') {
    return <PageLoader />;
  }

  const handleInprogressData = () => {
    setInprog(1);
  };

  const handleCompletedData = () => {
    setInprog(2);
  };

  const handleNotStartedData = () => {
    setInprog(3);
  };

  return (
    <>
      <Sidebar />
      <Header pageHeading="Welcome Back !" />
      <div className="pt-5">
        <div className="course-status-content course-status-slider" id="coursestatusslider">
          <ul className="course-status">
            <li role="presentation" className="course-progress" onClick={handleInprogressData}>
              Inprogress
            </li>
            <li role="presentation" onClick={handleCompletedData}>Completed</li>
            <li role="presentation" onClick={handleNotStartedData}>Not Started</li>
          </ul>
        </div>
        <DashMyCourse funData={inprog} />
        <DashRecCourse />
        <DashCatalog />
      </div>
    </>
  );
}

export default Dashboard;
