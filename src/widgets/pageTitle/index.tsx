import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurnUp } from '@fortawesome/free-solid-svg-icons';

const PageTitle = ({pageTitle, gobacklink}:any) => {
    const navigate = useNavigate();
    return (
      <h3 className="sitepage-title">
        <div dangerouslySetInnerHTML={{ __html: pageTitle }}></div>
        {
          gobacklink !== "" && 
          <Button
              size="sm"
              variant="light"
              onClick={() => navigate(gobacklink)}
          >
            Go Back <FontAwesomeIcon className="ms-1" icon={faTurnUp} /> 
          </Button>
        }
      </h3>
    );
  };
  
  export default PageTitle;