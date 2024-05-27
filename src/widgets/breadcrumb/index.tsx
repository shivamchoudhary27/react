import { Container} from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import './style.scss';

const BreadcrumbComponent = ({ routes } : any) => {
  return (
    <Container fluid className="breadcrumb-box">
    <Breadcrumb>
      {routes.map((route : any, index : number) => {
        if (index === routes.length - 1) {
          return (
            <Breadcrumb.Item active key={route.name}>
              {route.name}
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: route.path }} key={route.name}>
              {route.name}
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
    </Container>
  );
};

export default BreadcrumbComponent;
