import React from "react";
import { Button } from "react-bootstrap";

type Props = {};

const ChooseAction = (props: Props) => {
  return (
    <React.Fragment>
      <h5>Please choose action:</h5>
      <p>
        You can create new slot for this department or you can keep the same
        institute Timeslot.
      </p>
      <div className="site-button-group">
        <Button variant="primary">Add Slot</Button> or{" "}
        <Button variant="primary">Continue with Institute Time Slot</Button>
      </div>
    </React.Fragment>
  );
};

export default ChooseAction;
