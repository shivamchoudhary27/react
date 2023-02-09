import React, { useEffect, useState } from 'react';
import { CourseTabToggle } from "../../type/dashboard";
import Sidebar from '../sidebar';
import Header from '../header';
// import Footer from '../footer';
import DashMyCourse from '../../widgets/dashboard_Comp/dash_mycourse_comp';
import useUserinfo from '../../features/hooks/userinfo';
import Loader from '../../widgets/loader/pageloader';
import './style.scss';

function Dashboard() {
  const res = useUserinfo();
  const [linkToggle, setLinkToggle] = useState<number>(1);
  const [toggleColor, setToggleColor] = useState<CourseTabToggle>({ inprogColor: '#f57f17', compltColor: '', notcompleteColor: '' });

  if (res === 'loading') {
    return <Loader />;
  }

  const handleInprogressData = () => {
    setLinkToggle(1);
    setToggleColor({inprogColor: '#f57f17', compltColor: '', notcompleteColor: ''});
  };

  const handleCompletedData = () => {
    setLinkToggle(2);
    setToggleColor({inprogColor: '', compltColor: '#f57f17', notcompleteColor: ''});
  };

  const handleNotStartedData = () => {
    setLinkToggle(3);
    setToggleColor({inprogColor: '', compltColor: '', notcompleteColor: '#f57f17'});
  };

  return (
    <>
      <Sidebar />
      <Header pageHeading="Welcome Back !" welcomeIcon={false} />
      <div className="pt-5">
        <div className="course-status-content course-status-slider" id="coursestatusslider">
          <ul className="course-status">
            <li role="presentation" style={{color: toggleColor.inprogColor}} className="course-progress" id="inprogressColor" onClick={handleInprogressData}>
              Inprogress
            </li>
            <li role="presentation" style={{color: toggleColor.compltColor}} id="completedColor" onClick={handleCompletedData}>
              Completed
            </li>
            <li role="presentation" style={{color: toggleColor.notcompleteColor}} id="notStartedColor" onClick={handleNotStartedData}>
              Not Started
            </li>
          </ul>
        </div>
        <DashMyCourse linkToggle={linkToggle} />
      </div>
      {/* <Footer /> */}
    </>
  );
}
export default Dashboard;
