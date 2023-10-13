import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  getInstituteSlotAction: any;
  toggleModalShow: any;
  resetClassroomForm: any;
};

const ChooseAction = (props: Props) => {
  return (
    <React.Fragment>
      <h5>Please choose action:</h5>
      <p>
        You can create new slot for this department or you can keep the same
        institute Timeslot.
      </p>
      <div className="site-button-group">
        <Button variant="primary" onClick={() => {props.toggleModalShow(true); props.resetClassroomForm()}}>Add Slot</Button> or{" "}
        <Button variant="primary" onClick={(e) => {props.getInstituteSlotAction(e.type)}}>Continue with Institute Time Slot</Button>
      </div>
    </React.Fragment>
  );
};

export default ChooseAction;
