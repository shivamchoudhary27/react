import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../../adapters";
import Header from "../../header/";
import Sidebar from "../../sidebar/";
import Footer from "../../footer/";
import BreadCrumb from "../../../widgets/BreadCrumb";
import Cards from "../../../widgets/CourseComp";
import ErrorBox from "../../../widgets/ErrorBox";
import Modal_Elem from "../../../widgets/Modal";

const CourseView = () => {
  const { id } = useParams();
  const { fullname } = useParams();
  const courseid = id;
  const [title, setTitle] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_contents",
      courseid: courseid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (courseid !== query.courseid || res.data.errorcode) {
            setError("Something went wrong");
          } else {
            setTitle(res.data);
            // console.log(localStorage.setItem('instanceid', res.data[0].modules.instance)); 
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(title.modules);

  const showSide = () => {
    setShow(!show);
  };

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        <h2>{<ErrorBox msg={error}/>}</h2>
          <BreadCrumb title={fullname}
            breadcrumbItem={[
              ["Home", "/dashboard", true],
              ["Course", "/mycourse", true],
              ["Courseview", "/courseview", false],
            ]}
          />
         
          {title.map((courses, index) => (
            <div key={Math.random() + courses.id}>
              {courses.modules.map((activity, i) =>
              // {window.console.log(activity)}

                activity.modname === "resource" ? (
                  <div
                    className="container-fluid page-box"
                    key={index + activity.id}
                  >
                    <Link
                      to={`/mod/video/${activity.id}/${courseid}`}
                      state={{
                        vidurl: `${activity.contents[0].fileurl}`,
                        vidname: `${activity.name}`,
                      }}
                    >
                      <Cards title={activity.name} icon={activity.modicon} />
                    </Link>
                  </div>
                ) : (
                  <div
                    className="container-fluid page-box"
                    key={index + activity.id}
                  >

                    <Link to={`/mod/view/${activity.name}/${activity.instance}`}>
                      <Cards title={activity.name} icon={activity.modicon}/>
                    </Link>
                  </div>
                )
              )}
            </div>
          ))}
        <Footer />
      </main>
    </>
  );
};

export default CourseView;
