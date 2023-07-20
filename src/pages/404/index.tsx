import React, { useContext } from "react";
import CustomButton from "../../widgets/formInputFields/buttons";
import { useNavigate } from "react-router-dom";
import UserContext from "../../features/context/user/user";
import Header from "../newHeader";
import Footer from "../newFooter";

type Props = {};

const Img =
  "https://img.freepik.com/free-vector/404-error-with-people-holding-numbers-concept-illustration_114360-7983.jpg?w=740&t=st=1689159385~exp=1689159985~hmac=99370a684b5b3a28e865a0350678c20d9237e2693d1df7cebdc1c78b6afa635f";

const PageNotFound = (props: Props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;

  return (
    <React.Fragment>
      <Header showRightNavs={false} />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={Img} alt="404: Page Not Found" width="500px" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>

          <CustomButton
            btnText="Home Page"
            onClick={() =>
              isLoggedIn === true
                ? navigate("/studentdashboard")
                : navigate("/")
            }
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PageNotFound;
