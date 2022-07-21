import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useLocation, useParams } from "react-router-dom";
import PageLoader from "../../../components/loader/pageloader";
import BreadCrumb from "../../../components/BreadCrumb";
import { getData } from "../../../adapters";

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
    // setTimeout(() => {
    setLoader(true);
    // }, 1000);
    let initial = true;
    if (location.state === null) {
      initial = false;
    }
    // var location = location.state ?? null;
    if (initial === false) {
      console.log("getting from api");
      //api call
      const query = {
        wsfunction: "mod_resource_get_resources_by_courses",
        courseids: courseids,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (courseids !== query.courseids || res.data.errorcode) {
              console.log("Something went wrong");
              // setError("Something went wrong");
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
        <Container>
          <div className="container-fluid page-box">
            <div className="card" id="height1">
              <div className="card-body">
                <div className="card-title">
                  <h2>Resource Video</h2>
                  <BreadCrumb
                    breadcrumbItem={[
                      ["Home", "/dashboard", true],
                      ["Course", "/mycourse", true],
                      ["Video", "/video", false],
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          {stateurl.status === false ? (
            <PageLoader />
          ) : (
            <div className="text-center">
              <video autoPlay width="720px  " controls>
                <source src={stateurl.url} type="video/mp4" />
              </video>
            </div>
          )}
        </Container>
        {/* <Footer /> */}
      </main>
    </>
  );
}

export default Video;
