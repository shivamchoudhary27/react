import { Route } from "react-router-dom";
import Helpdeskmanagement from "../../../pages/siteAdminstration/helpdeskManagement";
import ManageTopic from "../../../pages/siteAdminstration/helpdeskManagement/managetopic";

const HelpdeskManagementRoute = () => {
  return [
    <Route
      path="/helpdeskmanagement"
      key="helpdeskmanagement"
      element={<Helpdeskmanagement />}
    />,
    <Route path="/managetopic" key="managetopic" element={<ManageTopic />} />,
  ];
};

export default HelpdeskManagementRoute;
