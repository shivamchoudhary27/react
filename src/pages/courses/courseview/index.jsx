import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../../../adapters';
import BreadCrumb from '../../../widgets/BreadCrumb';
import Cards from '../../../widgets/CourseComp';
import quizIcon from '../../../assets/activity-icon/quiz-icon.png';
import vidIcon from '../../../assets/activity-icon/video-icon.png';
import Sidebar from '../../sidebar';
import Header from '../../header';
import './style.scss';
import Errordiv from '../../../widgets/alert/errordiv';

function CourseView() {
  const { id } = useParams();
  const { fullname } = useParams();
  const courseid = id;
  const [title, setTitle] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const query = {
      wsfunction: 'core_course_get_contents',
      courseid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (courseid !== query.courseid || res.data.errorcode) {
            setShow(true);
          } else {
            setTitle(res.data);
            setShow(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function videoLink (videoId, videoUrl, videoName) {
    return (
      <div className="container-fluid page-box" key={videoId}>
        <Link
          to={`/mod/video/${videoId}/${courseid}`}
          state={{
            vidurl: `${videoUrl}`,
            vidname: `${videoName}`,
          }}
        >
          <Cards title={videoName} icon={vidIcon} />
        </Link>
      </div>
    )
  }

  function quizLink (quizId, quizName, quizInstance) {
    return (
      <div className="container-fluid page-box" key={quizId}>
        <Link to={`/mod/quiz/${courseid}/${quizInstance}`}
        state={{
          modname: quizName
        }}
        >
          <Cards title={quizName} icon={quizIcon} />
        </Link>
      </div>
    );
  }
  
  function certificateLink () {
    return (
      <div className="container-fluid page-box" key={Math.random()}>
        <p>certificate (in progress...)</p>
      </div>
    )
  }
  return (
    <>
      <Sidebar />
      <Header pageHeading={fullname} />
      <div className="main-container pt-4 course-view-slider" id="courseviewslider">
        <div className="contents">
          <BreadCrumb
            className="breadcrumb"
            title={fullname}
            breadcrumbItem={[
              ['Home', '/dashboard', true],
              ['Courseview', '/courseview', false],
            ]}
          />
          {show === true && <Errordiv cstate={show} msg="Something went wrong" />}

          {title.map((courses) => (
            <div key={Math.random() + courses.id}>

              {courses?.modules.map(
                (activity) => 
                ((activity.modname === 'resource') 
                ? videoLink (activity.id, activity.contents[0].fileurl, activity.name)
                : (activity.modname === 'quiz') 
                ? quizLink(activity.id, activity.name, activity.instance)
                : (activity.modname === 'customcert') 
                && certificateLink()
              ))}
            </div>
          ))}
          <div className="text-center">
            {/* <button className="more-course-btn">Load More</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
