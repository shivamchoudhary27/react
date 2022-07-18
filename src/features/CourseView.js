import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BreadCrumb from "../components/BreadCrumb";
import { useState, useEffect } from "react";
import Cards from "../components/CourseComp";
import { useParams } from "react-router-dom";
import { getData } from "../adapters";
import { Container } from "react-bootstrap";

const CourseView = () => {
  const { id } = useParams();
  const { fullname } = useParams();
  const courseid = id;
  const [title, setTitle] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_contents",
      courseid: courseid,
    };
    getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            setTitle(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const showSide = () => {
      setShow(!show);
    };

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
                                  <h2>{fullname}</h2>
                                    <BreadCrumb
                                      breadcrumbItem={[
                                        ["Home", "/dashboard", true],
                                        ["Course", "/mycourse", true],
                                        ["Courseview", "/courseview", false],
                                      ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {title.map((courses, index) => (
                        <div key={Math.random() + courses.id}>
                            {
                                courses.modules.map((activity, i) => (
                                    // {{ {console.log(activity)}}}
                                        (activity.modname === "resource") ?
                                        
                                        <div className="container-fluid page-box" key={index + activity.id}>
                                           <Link to={`/mod/video/${activity.modname}`} state={{ vidurl: `${activity.contents[0].fileurl}`, vidname: `${activity.name}`}}><Cards title={activity.name} /></Link>
                                        </div>
                                        :
                                        <div className="container-fluid page-box" key={index + activity.id}>
                                            <Link to={`/mod/view/${activity.name}`}><Cards title={activity.name} /></Link>
                                        </div>
                                ))
                            }
                        </div>
                    ))}
                </Container>
                <Footer />
            </main>
        </>
    );
}

export default CourseView;
