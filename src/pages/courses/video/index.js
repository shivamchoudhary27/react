import React, { useEffect, useState } from "react";
import { getData } from "../../../adapters";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../header/";
import Sidebar from "../../sidebar/";
import Footer from "../../footer/";
import BreadCrumb from "../../../widgets/BreadCrumb";
import PageLoader from "../../../widgets/loader/pageloader";
import Modal_Elem from "../../../widgets/Modal";
import ReactPlayer from 'react-player';
import { useBeforeunload } from 'react-beforeunload';

function Video() {
  const location = useLocation();
  const [stateurl, setStateUrl] = useState({ status: false });
  const [show, setShow] = useState(true);
  const { id, courseid } = useParams();
  const courseids = [courseid];
  
  const [resumed, setResumed] = useState(false);
  const vidKey = 'video-' + id + '-' + localStorage.getItem('userid');
  const lastVidStatus = localStorage.getItem(vidKey);

  const showSide = () => {
    setShow(!show);
  };

  useEffect(() => {
    let initial = true;

    if (location.state === null) {
      initial = false;
    }
    if (initial === false) {
      const query = {
        wsfunction: "mod_resource_get_resources_by_courses",
        courseids: courseids,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (courseids !== query.courseids || res.data.errorcode) {
              console.log("Something went wrong");
            } else {
              res.data.resources.map((item, index) => {
                if (item.coursemodule == id) {
                  console.log(item.contentfiles[0].fileurl);

                  setStateUrl({
                    status: true,
                    url:
                      item.contentfiles[0].fileurl +
                      "?token=" +
                      localStorage.getItem("token"),
                  });
                }
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var { vidurl, vidname } = location.state;
      setStateUrl({
        status: true,
        url: vidurl + "&token=" + localStorage.getItem("token"),
      });
    }
  }, []);

  useBeforeunload((event) => {
    // event.preventDefault();
    alert('ddddddd');
    // if (value !== '') {
    //   event.preventDefault();
    // }
  });

  const videoReady = (e) => {
    console.log('ready');
    const currentVideoTime = e.getCurrentTime();
    if (currentVideoTime > 0) {
      localStorage.setItem(vidKey, currentVideoTime);
    }
  }

  const videoEnded = () => {
    localStorage.removeItem(vidKey);
  }

  const getResponse = (e) => {
     if (e === true) {
       getVideoCurrentTime();
       setResumed(true);
     } else {
       setResumed(false);
       localStorage.removeItem(vidKey);
     }
  }

  const getVideoCurrentTime = (e) => {
    const videoElement = document.querySelector(".resource-video video");
    videoElement.currentTime = localStorage.getItem(vidKey);
  }

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        <BreadCrumb title="Resource Video"
          breadcrumbItem={[
            ["Home", "/dashboard", true],
            ["Course", "/mycourse", true],
            ["Video", "/video", false],
          ]}
        />
        {stateurl.status === false ? (
          <PageLoader />
        ) : (
          <>
            {
              (lastVidStatus !== null && resumed === false ) && <Modal_Elem openModal={true} getResponse={getResponse}/>
            }
            <div className="text-center">
              <ReactPlayer
                  className="resource-video" 
                  url={stateurl.url} 
                  onReady={videoReady}
                  onEnded={videoEnded}
                  controls
              />
            </div>
          </>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Video;
