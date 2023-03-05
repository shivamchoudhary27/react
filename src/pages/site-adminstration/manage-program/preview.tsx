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
      <Sidebar />
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Preview Page</h3>{" "}
              <Button variant="outline-secondary" onClick={()=> navigate('/manageprogram')}>Back</Button>
            </div>
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
        </div>
      </Container>
    </>
  );
};

export default Preview;
