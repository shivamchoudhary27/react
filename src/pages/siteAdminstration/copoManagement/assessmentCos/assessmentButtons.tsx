import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  addTestColumns: any
  addIaColumns: any
  addLabColumns: any
};

const AssessmentButtons = (props: Props) => {
  return (
    <React.Fragment>
      <div className="my-3">
        <Button variant="primary" type="button" className="me-2" size="sm" onClick={props.addTestColumns}>
          <i className="fa-solid fa-plus"></i> Add Test
        </Button>
        <Button variant="primary" type="button" className="me-2" size="sm" onClick={props.addIaColumns}>
          <i className="fa-solid fa-plus"></i> Add IA
        </Button>
        <Button variant="primary" type="button" className="me-2" size="sm" onClick={props.addLabColumns}>
          <i className="fa-solid fa-plus"></i> Add LAB
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AssessmentButtons;
