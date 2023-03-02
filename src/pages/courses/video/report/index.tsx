import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { getData } from "../../../../adapters";
import "./style.scss";
import Errordiv from "../../../../widgets/alert/errordiv";
import UserContext from "../../../../features/context/user/user";
const Report = () => {
    const [course, setCourse] = useState<any>();
    const [resource, setResource] = useState([]);
    const [show, setShow] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoLogs, setVideoLogs] = useState<any>([]);
    const userCtx = useContext(UserContext);
    const userid = userCtx.userInfo.userid;
    useEffect(() => {
        const query = {
            wsfunction: "core_course_get_courses"
        };
        getData(query)
            .then(res => {
                if (res.data.errorcode) {
                    setShow(true);
                } else {
                    res.data.shift();
                    setShow(false);
                    setCourse(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        const query = {
            wsfunction: "mod_resource_get_resources_by_courses"
        };
        getData(query)
            .then(res => {
                if (res.data.errorcode) {
                    setShow(true);
                } else {
                    setShow(false);
                    setResource(res.data.resources);
                    setVideos(res.data.resources);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        let storedLogs: any = {};
        for (let [key, value] of Object.entries(localStorage)) {
            if (key.includes("video-")) {
                storedLogs[key] = value;
            }
        }
        setVideoLogs(storedLogs);
    }, []);
    function handleChange(e: { target: { selectedIndex: any; childNodes: { [x: string]: any; }; }; }) {
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index];
        let selectedCourse = parseInt(optionElement.getAttribute("value"));
        if (selectedCourse === 0) {
            setVideos(resource);
            return true;
        }
        let courseVideos = resource.filter((i: any) => {
            return i.course === selectedCourse;
        });
        console.log(courseVideos);
        setVideos(courseVideos);
    }
    function videoLinkBtn(videoId: React.Key | null | undefined, videoUrl: any, videoName: any, courseid: any, vidKey: string) {
        let linkName = videoLogs[vidKey] !== undefined ? "Resume video" : "Start video";
        return (
            <div className="container-fluid page-box" key={videoId}>
                <Link
                    to={`/mod/video/${videoId}/${courseid}`}
                    state={{
                        modurl: `${videoUrl}`,
                        modname: `${videoName}`
                    }}
                >
                    {linkName}
                </Link>
            </div>
        );
    }
    function videoWatchedInfo(videoId: React.Key | null | undefined, vidKey: string) {
        return videoLogs[vidKey] !== undefined ? <>{Math.floor(videoLogs[vidKey])} sec</> : <>Not started</>;
    }
    function videoStatusColumns(videoId: any, videoUrl: string, videoName: string, courseid: any) {
        let vidKey = "video-" + videoId + "-" + userid;
        let videoWatched = videoWatchedInfo(videoId, vidKey);
        let videoLink = videoLinkBtn(videoId, videoUrl, videoName, courseid, vidKey);
        return (
            <>
                <td>{videoName}</td>
                <td>--</td>
                <td>{videoWatched}</td> 
                <td>{videoLink}</td>
            </>
        );
    }
    return (
        <>
            <Header pageHeading="Video's Report" welcomeIcon={false} />
            <Sidebar />
            <div className="main-container">
                <div className="contents">
                    {show === true ? (
                        <Errordiv cstate={show} msg="Something went wrong" />
                    ) : (
                        <div className="pt-5">
                            <select onChange={handleChange} id="selct_item">
                                <option value="0">All</option>
                                {course !== undefined &&
                                    course.map((item: { id: any; fullname: string; }) => (
                                        <option value={item.id} key={item.id}>
                                            {item.fullname}
                                        </option>
                                    ))}
                            </select>
                            <div>
                                {videos.length < 1 ? (
                                    <Errordiv cstate={true} msg="No videos to show" />
                                ) : (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Watched</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {videos.length > 0 &&
                                                videos.map((modname: any) => (
                                                    <tr key={modname.id}>
                                                        {videoStatusColumns(
                                                            modname.id,
                                                            modname.contentfiles[0].fileurl,
                                                            modname.name,
                                                            modname.course
                                                        )}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default Report;
