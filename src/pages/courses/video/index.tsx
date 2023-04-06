import { useEffect, useState, useContext } from "react";
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
  const [stateurl, setStateUrl] = useState<any>({
    status: false,
    modname: "",
    url: "",
  });
  const { id, courseid } = useParams<string>();
  const courseids = [courseid];
  const [modules, setModules] = useState<any>({ status: false });
  const [resumed, setResumed] = useState(false);
  const [vidKey, setVidkey] = useState("");
  const [lastVidStatus, setLastVidStatus] = useState<any>(null);

  useEffect(() => {
    setVidkey(`video-${id}-${userId}`);
    setResumed(false);
  }, [id]);
  useEffect(() => {
    setLastVidStatus(localStorage.getItem(vidKey));
  }, [vidKey]);
  useEffect(() => {
    let initial = true;
    if (location.state === null) {
      initial = false;
    }
    if (initial === false) {
      const query = {
        wsfunction: "mod_resource_get_resources_by_courses",
        courseids,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (courseids !== query.courseids || res.data.errorcode) {
              console.log("Something went wrong");
            } else {
              res.data.resources.map(
                (item: {
                  id: string | undefined;
                  contentfiles: { fileurl: any }[];
                  name: any;
                }) => {
                  if (item.id === id) {
                    setStateUrl({
                      status: true,
                      url: `${item.contentfiles[0].fileurl}?token=${userCtx.token}`,
                      modname: item.name,
                    });
                  }
                }
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const { modurl, modname } = location.state;
      setStateUrl({
        status: true,
        url: `${modurl}?token=${userCtx.token}`,
        modname,
      });
    }
  }, [id]);
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_contents",
      courseid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode !== undefined) {
            setModules({
              status: false,
              data: "Error while fetching modules",
            });
          } else {
            setModules({
              status: true,
              data: res.data,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const videoReady = (e: { getCurrentTime: () => any }) => {
    const currentVideoTime = e.getCurrentTime();
    if (currentVideoTime > 0) {
      localStorage.setItem(vidKey, currentVideoTime);
    }
  };
  const videoEnded = () => {
    localStorage.removeItem(vidKey);
  };
  const getVideoCurrentTime = () => {
    var videoElement = (
      document.querySelector(".resource-video video") as HTMLInputElement | null
    )?.currentTime;
    videoElement = localStorage.getItem(vidKey);
  };
  const getResponse = (e: boolean) => {
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
      <Header pageHeading={stateurl.modname} welcomeIcon={false} />
      <div className="video-content pt-4 video-slider" id="videoslider">
        <Row className="video-row">
          <div className="col-sm-9 video-left-column">
            <div>
              {stateurl.status === false ? (
                <SkeletonMimic />
              ) : (
                <>
                  {lastVidStatus !== null && resumed === false && (
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
                defaultActiveKey="transcript"
                id="uncontrolled-tab-example"
                className="mb-3 vid-content"
              >
                <Tab eventKey="overview" title="Overview">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </Tab>
                <Tab eventKey="transcript" title="Transcript">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
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
                modules.data.map(
                  (section: {
                    name: string;
                    modules: any[];
                    id: string | number;
                  }) => (
                    <ModuleAccordion
                      header={section.name}
                      items={section.modules}
                      key={section.id}
                      courseid={courseid}
                    />
                  )
                )
              )}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}
export default Video;
