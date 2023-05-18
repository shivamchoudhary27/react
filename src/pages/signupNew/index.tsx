import React , {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupForm from "./form";
import ForgotPasswordForm from "../forgotPasswordNew";
import logo from "../../assets/images/logo.png";
import config from "../../utils/config";
import "./style.scss";

const SignUpNew = () => {
  const location = useLocation().search;
  const [formToggle, setformtoggle] = useState<string | null>(null);
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    setformtoggle(urlParams.get("form"));
  }, [location]);

  return (
    <React.Fragment>
      <Container fluid className="signup-container">
        <Row>
          <Col lg={7}>
            <div className="signup-leftImg">
              <span className="visually-hidden">Login Banner</span>
            </div>
          </Col>
          <Col lg={5} className="d-flex align-items-center justify-content-center">
            <div className="signup-rightForm text-center">
              <div className="signup-logo rounded-circle m-auto mb-4">
                <Link to="/">
                  <img className="img-fluid" src={logo} alt="Ballistic Learning Pvt Ltd" />
                </Link>
              </div>
              <h2 className="signup-title">Welcome to Ballistic University</h2>

              {formToggle === "forgotpassword" ? (
                <React.Fragment>
                  <p className="signup-desc mb-4">Please enter your email to request a new password</p>
                  <ForgotPasswordForm />
                  <p>Go back to <a href={oAuthUrl} className="ms-1">Sign in</a></p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="signup-desc mb-4">Please enter your details to Sign up</p>
                  <SignupForm />
                  <p>Already a member? <a href={oAuthUrl} className="ms-1">Sign in</a></p>
                </React.Fragment>
              )}

            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SignUpNew;
