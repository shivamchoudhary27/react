import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getUserProfile } from "./auth/login/index";
import { useState } from "react";
import Cards from "../components/CourseComp";

const CourseView = () => {
    const [show, setShow] = useState(true);
    const showSide = () => {
        setShow(!show);
    };
    if (!localStorage.getItem("userid") || localStorage.getItem("userid") == undefined) {
        getUserProfile();
    }
    return (
        <>
            <main className={show ? "space-toggle" : null}>
                <Header toggleFun={showSide} currentState={show} />
                <Sidebar currentState={show} />
                <div className="container-fluid page-box">
                    <div className="card" id="height1">
                        <div className="card-body">
                            <div className="card-title"><h2>PHP</h2>
                                <nav aria-labels="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/mycourse">Courses</Link></li>
                                        <li className="breadcrumb-item">PHP</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid page-box">
                    <card>
                        <Link to=""><Cards title="Topic 1" /></Link>
                        <Link to=""><Cards title="Topic 2" /></Link>
                        <Link to=""><Cards title="Topic 3" /></Link>
                    </card>
                </div>
            </main>
            <Footer />
        </>
    );
}
export default CourseView;