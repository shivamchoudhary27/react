import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageTitle = ({pageTitle, gobacklink}:any) => {
    const navigate = useNavigate();
    return (
      <h3 className="sitepage-title">
        {pageTitle}
        <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => navigate(gobacklink)}
          >
            Go back 
          </Button>
      </h3>  
    );
  };
  
  export default PageTitle;