import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageTitle = ({pageTitle, gobacklink}:any) => {
    const navigate = useNavigate();
    return (
      <h3 className="sitepage-title">
        <div dangerouslySetInnerHTML={{ __html: pageTitle }}></div>
        {
          gobacklink !== "" && 
          <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => navigate(gobacklink)}
          >
            Go Back 
          </Button>
        }
      </h3>
    );
  };
  
  export default PageTitle;