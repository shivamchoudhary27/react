import React from "react";
import { Button } from "react-bootstrap";

type Props = {};

const AssessmentButtons = (props: Props) => {
  return (
    <React.Fragment>
      <div className="my-3">
        <Button variant="primary" type="button" className="me-2" size="sm">
          <i className="fa-solid fa-plus"></i> Add Test
        </Button>
        <Button variant="primary" type="button" className="me-2" size="sm">
          <i className="fa-solid fa-plus"></i> Add IA
        </Button>
        <Button variant="primary" type="button" className="me-2" size="sm">
          <i className="fa-solid fa-plus"></i> Add LAB
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AssessmentButtons;
