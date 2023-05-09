import React from 'react';
// import CustomRoutes from './features/routes/routes';
import { UserContextProvider } from './features/context/user/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './assets/styles/global.scss';
// import './widgets/components.css';
import NewCustomRoutes from './features/routes';

function App() {
  return (
    <UserContextProvider>
      <NewCustomRoutes />
    </UserContextProvider>
  );
}
export default App;