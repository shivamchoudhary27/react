import React from "react";
import { Route } from "react-router-dom";

const Helpdesk = React.lazy(() => import("../../../pages/helpdesk"))
const Helpdeskmanagement = React.lazy(() => import("../../../pages/siteAdminstration/helpdeskManagement"))
const ManageTopic = React.lazy(() => import( "../../../pages/siteAdminstration/helpdeskManagement/managetopic"))

const HelpdeskManagementRoute = () => {
  return [
    <Route
      path="/helpdeskmanagement"
      key="helpdeskmanagement"
      element={<Helpdeskmanagement />}
    />,
    <Route path="/helpdesk" key="helpdesk" element={<Helpdesk />} />,
    <Route path="/managetopic" key="managetopic" element={<ManageTopic />} />,
  ];
};

export default HelpdeskManagementRoute;
