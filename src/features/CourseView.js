import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
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

                                <div className="card-title"><h2>{fullname}</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                            <li className="breadcrumb-item"><Link to="/mycourse">Courses</Link></li>
                                            <li className="breadcrumb-item">{fullname}</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {title.map((courses, index) => (
                        <div key={Math.random() + courses.id}>
                            {
                                courses.modules.map((activity, i) => (
                                    <div className="container-fluid page-box" key={index + activity.id}>
                                        <Link to={`/mod/${activity.id}`}><Cards title={activity.name} /></Link>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                    <Link to="/video" state={{ url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }}>Video link</Link>
                </Container>
                <Footer />
            </main>
        </>
    );
}
export default CourseView;
