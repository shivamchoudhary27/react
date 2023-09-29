import React, { useEffect, useContext, useState } from "react";
import { getData } from "../../../adapters/coreservices";
import UserContext from "../../../features/context/user/user";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import { searchCountryNameById } from "../../../globals/getCountry";
import EditUserProfile from "./modal";
import { Button } from "react-bootstrap";

const UserProfile = () => {
    const [user, setUser] = useState({
        "userFirstName": "",
        "userLastName": "",
        "userEmail": "",
        "userId": 0,
        "userCountry": "",
        "enabled": false,
        "roles": [],
        "files": []
    });
    const [modalShow, setModalShow] = useState(false);
    const [refreshData, setRefreshData] = useState(true);
    const [editComponent, setEditComponent] = useState('profile');
    
    useEffect(() => {
        getData(`/user/profile`, {})
        .then((result: any) => {
            if (result.status === 200) setUser(result.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }, [refreshData]);

    // handle modal hide & show functionality === >>>
    const toggleModalShow = (component: string ) => {
        setModalShow(!modalShow);
        setEditComponent(component);
    };

    const refreshToggle = () => {
        setRefreshData(!refreshData);
    };

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
                    <PageTitle
                        pageTitle={(user.userFirstName + ' ' + user.userLastName).replace(/\b\w/g, match => match.toUpperCase())} 
                        gobacklink="/dashboard" 
                    />
                    <h3>Country: {searchCountryNameById(user.userCountry)} </h3>
                    <h3>Email: {user.userEmail} </h3>
                    {
                        user.roles.length > 0 &&
                        <h3>Roles: 'User Roles' </h3>
                    }
                    <Button onClick={() => toggleModalShow('profile')}>Edit Profile</Button>
                    <div>
                        <img
                            onClick={() => toggleModalShow('picture')}
                            className="img-fluid"
                            src={user.files.length > 0 ? user.files[0].url : ''}
                            alt={user.files.length > 0 ? user.files[0].originalFileName : user.userFirstName}
                            width={"500px"}
                        />
                    </div>
                </Container>
            </div>
            <Footer />
            <EditUserProfile
                show={modalShow}
                onHide={() => toggleModalShow(false)}
                userobj={user}
                togglemodalshow={toggleModalShow}
                updateAddRefresh={refreshToggle}
                editComponent={editComponent}
            />
        </React.Fragment>
    );
};

export default UserProfile;
