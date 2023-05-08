
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import './style.scss';

const BreadcrumbComponent = ({ routes } : any) => {
  return (
    <Breadcrumb>
      {routes.map((route : any, index : number) => {
        if (index === routes.length - 1) {
          return (
            <Breadcrumb.Item active key={route.name} className="psychedelic">
              {route.name}
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: route.path }} key={route.name} className="breadcrumb-item psychedelic">
              {route.name}
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
