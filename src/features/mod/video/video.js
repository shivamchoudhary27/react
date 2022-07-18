import React, {useState} from "react";
import { Container } from "react-bootstrap";
import Footer from "../../Footer";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useLocation, Link } from "react-router-dom";
import PageLoader from "../../../components/loader/pageloader";

function Video() {
  const location = useLocation();
  var { vidurl, vidname } = location.state;
  const [show, setShow] = useState(true);
  const [loader, setLoader] = useState(true);
  vidurl += "&token=" + localStorage.getItem('token'); 
  
  setTimeout(() => {setLoader(false)}, 1000);

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
                  <h2>{vidname}</h2>
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
          {
            loader === true ? <PageLoader /> 
            :
            <video autoPlay width="720" height="540" controls>
              <source src={vidurl} type="video/mp4" />
            </video>
          }

        </Container>
        {/* <Footer /> */}
      </main>
    </>
  );
}

export default Video;
