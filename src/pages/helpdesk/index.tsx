import React from "react";
import TeacherHelpdesk from "./teacher";

type Props = {};

const Helpdesk = (props: Props) => {
  // const currentUserRole = useSelector(
  //   (state) => state.globalFilters.currentUserRole
  // );
  return (
    <React.Fragment>
      {/* {currentUserRole.shortName !== "" && <TeacherHelpdesk />} */}
      <TeacherHelpdesk />
    </React.Fragment>
  );
};

export default Helpdesk;
