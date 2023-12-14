import { Route } from "react-router-dom";
import Helpdeskmanagement from "../../../pages/siteAdminstration/helpdeskManagement";

const HelpdeskManagementRoute = () => {
  return [
    <Route path="/helpdeskmanagement" key="helpdeskmanagement" element={<Helpdeskmanagement />} />,
  ];
};

export default HelpdeskManagementRoute;