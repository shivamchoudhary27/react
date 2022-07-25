import React, { useEffect, useState } from "react";
import { getData } from "../../../adapters";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../header/";
import Sidebar from "../../sidebar/";
import Footer from "../../footer/";
import BreadCrumb from "../../../widgets/BreadCrumb";
import PageLoader from "../../../widgets/loader/pageloader";
import Modal_Elem from "../../../widgets/Modal";

function Video() {
  const location = useLocation();
  const [stateurl, setStateUrl] = useState({ status: false });
  const [show, setShow] = useState(true);
  const [loader, setLoader] = useState(false);
  const { id, courseid } = useParams();
  const courseids = [courseid];

  const showSide = () => {
    setShow(!show);
  };

  useEffect(() => {
    setLoader(true);

    let initial = true;
    if (location.state === null) {
      initial = false;
    }
    if (initial === false) {
      console.log("getting from api");
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
      console.log("getting from state location");
      var { vidurl, vidname } = location.state;
      setStateUrl({
        status: true,
        url: vidurl + "&token=" + localStorage.getItem("token"),
      });
    }
  }, []);

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
        <Modal_Elem />
        {stateurl.status === false ? (
          <PageLoader />
        ) : (
          <div className="text-center">
            <video autoPlay width="720px" id="video_time" controls>
              <source src={stateurl.url} type="video/mp4" />
            </video>
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Video;
