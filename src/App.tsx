import { UserContextProvider } from './features/context/user/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './assets/styles/global.scss';
import './assets/styles/global-responsive.scss';
// import './widgets/components.css';
import NewCustomRoutes from './features/routes';
import MitGlobalAlert from './widgets/mitGlobalAlert/mitGlobalAlert';

function App() {
  return (
    <UserContextProvider>
      <NewCustomRoutes />
      <MitGlobalAlert />
    </UserContextProvider>
  );
}
export default App;