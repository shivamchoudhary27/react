import React from 'react';
import CustomRoutes from './features/routes/routes';
import { UserContextProvider } from './features/context/user/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './widgets/components.css';
function App() {
  return (
    <UserContextProvider>
      <CustomRoutes />
    </UserContextProvider>
  );
}
export default App;
