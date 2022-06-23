import React from "react";
import { useState } from "react";
import Header from "../mycomponents/Header";
import Footer from "../mycomponents/Footer";
import Sidebar from "../mycomponents/Sidebar";
import { Link } from "react-router-dom";

const Home = () => {
    const [isOpen, setIsopen] = useState(true);
    const ToggleSidebar = () => {
        setIsopen(!isOpen)
    }
    return (
        <>
            <main className={isOpen ? "space-toggle" : null}>
                <Header toggleFun={ToggleSidebar} currentState={isOpen} />
                <Sidebar currentState={isOpen} />
                <div className="container-fluid page-box">
                    <div className="card" id="height1">
                        <div className="card-body">
                            <div className="card-title"><h2>PHP</h2>
                                <nav aria-labels="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item"><a href="/">Courses</a></li>
                                        <li className="breadcrumb-item"><a href="/">PHP</a></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid page-box">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="col-lg-12">

                                <div className="card" id="height2">
                                    <div className="card-body">
                                        <div className="card-title"><h2>Topic</h2>
                                            <section>
                                                <ul>
                                                    <li id="section1" className="section"><a href="">Topic 1</a></li>
                                                    <li id="section2" className="section"><a href="">Topic 2</a></li>
                                                    <li id="section3" className="section"><a href="">Topic 3</a></li>
                                                </ul>

                                            </section>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
}
export default Home;