import React from "react";
import TeacherHelpdesk from "./teacher";
import { useSelector } from "react-redux";

type Props = {};

const Helpdesk = (props: Props) => {
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );
  return (
    <React.Fragment>
      {currentUserRole.shortName !== "" && <TeacherHelpdesk />}
    </React.Fragment>
  );
};

export default Helpdesk;
