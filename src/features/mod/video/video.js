import React, {useState} from "react";
import { Container } from "react-bootstrap";
import Footer from "../../Footer";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useLocation, Link } from "react-router-dom";

function Video() {
  const location = useLocation();
  const { url } = location.state;
  const [show, setShow] = useState(true);

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
                  <h2>Resource Video</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/mycourse">Course</Link>
                      </li>
                      <li className="breadcrumb-item">Video</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <video width="320" height="240" controls>
            <source src={url} type="video/mp4" />
          </video>
        </Container>
        <Footer />
      </main>
    </>
  );
}

export default Video;
