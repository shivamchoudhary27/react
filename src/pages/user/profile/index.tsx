import React, { useContext } from "react";
import UserContext from "../../../features/context/user/user";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";

const UserProfile = () => {
    const userCtx = useContext(UserContext);
    // const userid = userCtx.userInfo.userid ?? 0;
    const fullname = userCtx.userInfo.fullname.toString() ?? "";
    const userpictureurl = userCtx.userInfo.userpictureurl.toString() ?? "";
    
    return (
        <React.Fragment>
        <Header />
        <HeaderTabs activeTab="" />
        <BreadcrumbComponent
            routes={[
            { name: "User Profile", path: "" },
            ]}
        />
        <div className="contentarea-wrapper mt-3 mb-5">
            <Container fluid>
                <PageTitle pageTitle={fullname.replace(/\b\w/g, match => match.toUpperCase())} gobacklink="/dashboard" />
                <img
                    className="img-fluid"
                    src={userpictureurl}
                    alt={fullname}
                />
            </Container>
        </div>
        <Footer />
        </React.Fragment>
    );
};

export default UserProfile;
