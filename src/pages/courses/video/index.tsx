import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ReactPlayer from "react-player";
import { getData } from "../../../adapters";
import Sidebar from "../../sidebar";
import Header from "../../header";
import ModalElem from "../../../widgets/Modal";
import ModuleAccordion from "../../../widgets/accordian";
import UserContext from "../../../features/context/user/user";
import { SkeletonMimic, Col3 } from "./Skeleton";
import "./coursedetails.scss";
function Video() {
  const location = useLocation();
  const userCtx = useContext(UserContext);
  const userId = userCtx.userInfo.userid;
  const [stateurl, setStateUrl] = useState({ status: false });
  const { id, courseid } = useParams();
  const courseids = [courseid];
  const [modules, setModules] = useState({ status: false });
  const [resumed, setResumed] = useState(false);
  const [vidKey, setVidkey] = useState("");
  const [lastVidStatus, setLastVidStatus] = useState(null);
  useEffect(
    () => {
      setVidkey(`video-${id}-${userId}`);
      setResumed(false);
    },
    [id]
  );
  useEffect(
    () => {
      setLastVidStatus(localStorage.getItem(vidKey));
    },
    [vidKey]
  );
  useEffect(
    () => {
      let initial = true;
      if (location.state === null) {
        initial = false;
      }
      if (initial === false) {
        const query = {
          wsfunction: "mod_resource_get_resources_by_courses",
          courseids
        };
        getData(query)
          .then(res => {
            if (res.status === 200 && res.data) {
              if (courseids !== query.courseids || res.data.errorcode) {
                console.log("Something went wrong");
              } else {
                res.data.resources.map(item => {
                  if (item.id == id) {
                    setStateUrl({
                      status: true,
                      url: `${item.contentfiles[0].fileurl}?token=${
                        userCtx.token
                      }`,
                      modname: item.name
                    });
                  }
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        const { modurl, modname } = location.state;
        setStateUrl({
          status: true,
          url: `${modurl}?token=${userCtx.token}`,
          modname
        });
      }
    },
    [id]
  );
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_contents",
      courseid
    };
    getData(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode !== undefined) {
            setModules({
              status: false,
              data: "Error while fetching modules"
            });
          } else {
            setModules({
              status: true,
              data: res.data
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const videoReady = e => {
    const currentVideoTime = e.getCurrentTime();
    if (currentVideoTime > 0) {
      localStorage.setItem(vidKey, currentVideoTime);
    }
  };
  const videoEnded = () => {
    localStorage.removeItem(vidKey);
  };
  const getVideoCurrentTime = () => {
    const videoElement = document.querySelector(".resource-video video");
    videoElement.currentTime = localStorage.getItem(vidKey);
  };
  const getResponse = e => {
    if (e === true) {
      getVideoCurrentTime();
      setResumed(true);
    } else {
      setResumed(false);
      localStorage.removeItem(vidKey);
    }
  };
  return (
    <div>
      <Sidebar />
      <Header pageHeading={stateurl.modname} />
      <div className="video-content pt-4 video-slider" id="videoslider">
        <Row className="video-row">
          <div className="col-sm-9 video-left-column">
            <div>
              {stateurl.status === false ? (
                <SkeletonMimic />
              ) : (
                <>
                  {lastVidStatus !== null &&
                    resumed === false && (
                      <ModalElem openModal getResponse={getResponse} />
                    )}
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
            </div>
            <div>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 vid-content"
              >
                <Tab eventKey="home" title="Home">
                  <p>
                    Your love and pity doth the impression fill, Which vulgar
                    scandal stamp upon my brow; For what care I who calls me well
                    or ill, So you er-green my bad, my good allow? You are my
                    all-the-world, and I must strive To know my shames and praises
                    from your tongue; None else to me, nor I to none alive, That
                    my steel sense or changes right or wrong. In so profound abysm
                    I throw all care Of others voices, that my adder sense That my
                    steel sense or changes right or wrong. In so profound abysm I
                    throw all care Of others voices, that my adder sense
                  </p>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  <p>
                    Your love and pity doth the impression fill, Which vulgar
                    scandal stamp upon my brow; For what care I who calls me well
                    or ill, So you er-green my bad, my good allow? You are my
                    all-the-world, and I must strive To know my shames and praises
                    from your tongue; None else to me, nor I to none alive, That
                    my steel sense or changes right or wrong. In so profound abysm
                    I throw all care Of others voices, that my adder sense That my
                    steel sense or changes right or wrong. In so profound abysm I
                    throw all care Of others voices, that my adder sense
                  </p>
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  <p>
                    Your love and pity doth the impression fill, Which vulgar
                    scandal stamp upon my brow; For what care I who calls me well
                    or ill, So you er-green my bad, my good allow? You are my
                    all-the-world, and I must strive To know my shames and praises
                    from your tongue; None else to me, nor I to none alive, That
                    my steel sense or changes right or wrong. In so profound abysm
                    I throw all care Of others voices, that my adder sense That my
                    steel sense or changes right or wrong. In so profound abysm I
                    throw all care Of others voices, that my adder sense
                  </p>
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-sm-3 video-right-column">
            <div className="right-side-nav">
              {modules.status === false ? (
                <Col3 />
              ) : (
                modules.data.map(section => (
                  <ModuleAccordion
                    header={section.name}
                    items={section.modules}
                    key={section.id}
                    courseid={courseid}
                  />
                ))
              )}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}
export default Video;
