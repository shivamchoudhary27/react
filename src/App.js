import CustomRoutes from "./features/routes/routes";
import { UserContextProvider } from "./features/context/user/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./widgets/components.css";

const App = () => {
  return (
    <UserContextProvider>
      <CustomRoutes />
    </UserContextProvider>
  );
};

export default App;
