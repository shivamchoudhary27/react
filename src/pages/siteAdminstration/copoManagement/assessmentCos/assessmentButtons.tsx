import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  addTestColumns: any;
  addIaColumns: any;
  addLabColumns: any;
  assessmentData: any;
};

const AssessmentButtons = (props: Props) => {
  return (
    <React.Fragment>
      <div className="my-3">
        <Button
          variant="primary"
          type="button"
          className="me-2"
          size="sm"
          onClick={props.addTestColumns}
          disabled={props.assessmentData.length === 0}
        >
          <i className="fa-solid fa-plus"></i> Add Test
        </Button>
        <Button
          variant="primary"
          type="button"
          className="me-2"
          size="sm"
          onClick={props.addIaColumns}
          disabled={props.assessmentData.length === 0}
        >
          <i className="fa-solid fa-plus"></i> Add IA
        </Button>
        <Button
          variant="primary"
          type="button"
          className="me-2"
          size="sm"
          onClick={props.addLabColumns}
          disabled={props.assessmentData.length === 0}
        >
          <i className="fa-solid fa-plus"></i> Add LAB
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AssessmentButtons;
