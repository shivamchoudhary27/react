import React, { useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import videoIcon from '../assets/activity-icon/video-icon.png';
import quizIcon from '../assets/activity-icon/quiz-icon.png';
import UserContext from '../features/context/user/user';

const style = {
  borderRadius: '0px',
};
function ModuleAccordion(props) {
  const userCtx = useContext(UserContext);
  const userId = userCtx.userInfo.userid;
  const resumeCourseKey = 'crs-' + props.courseid + '-' + userId;
  const currentUrl = window.location.pathname;

  const [modules, setModules] = useState({ status: false, header: '1', data: [] });

  if (props.items.length > 0 && modules.status === false) {
    let accordianHeader = '1';
    let hasItems = false;
    props.items.map((i, j) => {
      if (i.modname === 'quiz') {
        hasItems = true;
        props.items[j].reactLink = `/mod/quiz/${props.courseid}/${i.instance}`;
        props.items[j].reactFileurl = null;
      } else if (i.modname === 'resource') {
        hasItems = true;
        props.items[j].reactLink = `/mod/video/${i.id}/${props.courseid}`;
        props.items[j].reactFileurl = i.contents[0].fileurl;
      }

      if (props.items[j].reactLink === currentUrl) {
        console.log(' in thte current')
        props.items[j].reactActive = true;
        if (props.items[j].modname === 'quiz') {
          localStorage.setItem(resumeCourseKey, props.items[j].instance + '-' + props.items[j].modname);
        } else {
          localStorage.setItem(resumeCourseKey, props.items[j].id + '-' + props.items[j].modname);
        }
        accordianHeader = '0';
      }
    });
    hasItems === true && setModules({ status: true, header: accordianHeader, data: props.items });
  }

  if (modules.status === false) {
    return '';
  }

  return (
    <Accordion defaultActiveKey={modules.header}>
      <Accordion.Item eventKey="0" style={style}>
        <Accordion.Header>{props.header}</Accordion.Header>
        {
            props.items.length > 0
            && (
            <Accordion.Body>
              {
                modules.data.map((item) => (
                  (item.modname === 'quiz' || item.modname === 'resource')
                  && (
                  <div
                    key={item.id}
                    style={item.reactActive === true ? { backgroundColor: 'rgb(226 223 223)' } : null}
                  >
                    <Link
                      key={item.id}
                      // style={item.reactActive === true ? {pointerEvents:'none'} : null}
                      to={item.reactLink}
                      state={{
                        modurl: `${item.reactFileurl}`,
                        modname: `${item.name}`,
                      }}
                    >
                      <p key={item.id} className="video-item">
                        <img className="video-icon" src={item.modname === 'quiz' ? quizIcon : videoIcon} alt="videoicon.png" />
                        {item.name}
                      </p>
                    </Link>
                  </div>
                  )
                ))
              }
            </Accordion.Body>
            )
          }

      </Accordion.Item>
    </Accordion>
  );
}

export default ModuleAccordion;
