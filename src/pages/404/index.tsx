import React from "react";
// import CustomButton from "../../widgets/formInputFields/buttons";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../features/context/user/user";
import Header from "../newHeader";
import Footer from "../newFooter";
import { Container, Image } from "react-bootstrap";
import notFoundImage from "../../assets/images/error-page.svg";

type Props = {};

const PageNotFound = (props: Props) => {
  // const navigate = useNavigate();
  // const userCtx = useContext(UserContext);
  // const isLoggedIn = userCtx.isLoggedIn;

  return (
    <React.Fragment>
      <Header showRightNavs={false} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Image className="page404" src={notFoundImage} alt="404: Page Not Found" fluid />
            {/* <CustomButton
              btnText="Home Page"
              onClick={() =>
                isLoggedIn === true
                  ? navigate("/studentdashboard")
                  : navigate("/")
              }
            /> */}
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PageNotFound;
