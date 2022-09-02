import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../../../adapters';
import BreadCrumb from '../../../widgets/BreadCrumb';
import Cards from '../../../widgets/CourseComp';
import quizIcon from '../../../assets/activity-icon/quiz-icon.png';
import vidIcon from '../../../assets/activity-icon/video-icon.png';
import Sidebar from '../../sidebar';
import Header from '../../header';
import ErrorBox from '../../../widgets/ErrorBox';
import './style.scss';

function CourseView() {
  const { id } = useParams();
  const { fullname } = useParams();
  const courseid = id;
  const [title, setTitle] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = {
      wsfunction: 'core_course_get_contents',
      courseid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (courseid !== query.courseid || res.data.errorcode) {
            setError('Something went wrong');
          } else {
            setTitle(res.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          {error !== '' && <ErrorBox msg={error} style='' />}

          {title.map((courses) => (
            <div key={Math.random() + courses.id}>
              {courses?.modules.map((activity) => (activity.modname === 'resource' ? (
                
                <div
                  className="container-fluid page-box"
                  key={activity.id}
                >
                  <Link
                    to={`/mod/video/${activity.id}/${courseid}`}
                    state={{
                      vidurl: `${activity.contents[0].fileurl}`,
                      vidname: `${activity.name}`,
                    }}
                  >
                    <Cards title={activity.name} icon={vidIcon} />
                  </Link>
                </div>
              ) : activity.modname === 'quiz' && (
              <div
                className="container-fluid page-box"
                key={activity.id}
              >
                <Link
                  to={`/mod/quiz/${activity.name}/${activity.instance}/${courseid}`}
                >
                  <Cards title={activity.name} icon={quizIcon} />
                </Link>
              </div>
              )))}
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
