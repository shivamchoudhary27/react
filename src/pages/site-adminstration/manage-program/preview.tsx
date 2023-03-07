import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Button, Container } from "react-bootstrap";

const Preview = () => {
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
        <Container fluid className="administration-wrapper">
          <div className="site-heading">
            <h3>Preview Page</h3>{" "}
            <Button variant="outline-secondary" onClick={()=> navigate('/manageprogram')}>Back</Button>
          </div>
          <hr />
          <div>
            <ul>
              {
                Object.entries(location.state).map(([key, val]: any)=>(
                  <li><strong>{key}</strong> : {val}</li>
                ))
              }
            </ul>
          </div>
        </Container>
        </div>        
      </div>      
    </>
  );
};

export default Preview;
