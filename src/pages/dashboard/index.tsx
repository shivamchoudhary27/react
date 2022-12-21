import React, { useState } from 'react';
import Sidebar from '../sidebar';
import Header from '../header';
import DashMyCourse from '../../widgets/dashboard_Comp/dash_mycourse_comp';
import useUserinfo from '../../features/hooks/userinfo';
import PageLoader from '../../widgets/loader/pageloader';
import DashCatalog from '../../widgets/dashboard_Comp/dash_catalog_comp';
import DashRecCourse from '../../widgets/dashboard_Comp/dash_rec_comp';
import './style.scss';
function Dashboard() {
  const res = useUserinfo();
  const [linkToggle, setLinkToggle] = useState(1);
  if (res === 'loading') {
    return <PageLoader />;
  }
  
  const handleInprogressData = () => {
    setLinkToggle(1);
    let inprogressColor = (document.getElementById("inprogressColor") as HTMLInputElement | null)?.style.color;
    inprogressColor = '#f57f17';
    let completedColor = (document.getElementById("completedColor") as HTMLInputElement | null)?.style.color;
    completedColor = '';
    let notStartedColor = (document.getElementById("notStartedColor") as HTMLInputElement | null)?.style.color;
    notStartedColor = '';
    // document.getElementById('inprogressColor').style.color = '#f57f17';
    // document.getElementById('completedColor').style.color = '';
    // document.getElementById('notStartedColor').style.color = '';
  };
  const handleCompletedData = () => {
    setLinkToggle(2);
    document.getElementById('completedColor').style.color = '#f57f17';
    document.getElementById('inprogressColor').style.color = '';
    document.getElementById('notStartedColor').style.color = '';
    document.getElementById('inprogressColor').classList.remove('active-link');
  };
  const handleNotStartedData = () => {
    setLinkToggle(3);
    document.getElementById('notStartedColor').style.color = '#f57f17';
    document.getElementById('inprogressColor').style.color = '';
    document.getElementById('completedColor').style.color = '';
  };
  return (
    <>
      <Sidebar />
      <Header pageHeading="Welcome Back !" welcomeIcon={false} />
      <div className="pt-5">
        <div className="course-status-content course-status-slider" id="coursestatusslider">
          <ul className="course-status">
            <li role="presentation" className="course-progress active-link" id="inprogressColor" onClick={handleInprogressData}>
              Inprogress
            </li>
            <li role="presentation" id="completedColor" onClick={handleCompletedData}>
              Completed
            </li>
            <li role="presentation" id="notStartedColor" onClick={handleNotStartedData}>
              Not Started
            </li>
          </ul>
        </div>
        <DashMyCourse linkToggle={linkToggle} />
        <DashRecCourse />
        <DashCatalog />
      </div>
    </>
  );
}
export default Dashboard;
