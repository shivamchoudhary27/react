import React from "react";
import AssessmentTable from "./assessmentTable";
import { Alert } from "react-bootstrap";

type Props = {
  setActiveTab: any;
};

const AssessmentForCOs = (props: Props) => {
  return (
    <div>
      <AssessmentTable setActiveTab={props.setActiveTab} />
      <Alert variant="primary" className="mt-4">
        <strong>Note:</strong>
        <ul>
          <li>ESE mark calculated offline and put here manually.</li>
          <li>
            Test, AI and LAB marks come automatically from the Quiz and
            Assignment grade book.
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default AssessmentForCOs;
