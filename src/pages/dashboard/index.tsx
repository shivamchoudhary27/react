import React, { useState } from 'react';
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
      <Header pageHeading="Welcome Back !" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <div className="course-status-content">
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
      </div>      
    </>
  );
}
export default Dashboard;
