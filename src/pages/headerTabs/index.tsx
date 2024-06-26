import { useState } from "react";
import { useSelector } from "react-redux";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import "./style.scss";
import dashboardIcon from "../../assets/images/icons/dashboard.svg";
import calendarIcon from "../../assets/images/icons/calendar.svg";
import performanceIcon from "../../assets/images/icons/performance.svg";
import gradeboolIcon from "../../assets/images/icons/gradebook.svg";
import attendanceIcon from "../../assets/images/icons/attendance.svg";
import helpdeskIcon from "../../assets/images/icons/helpdesk.svg";
import siteadminIcon from "../../assets/images/icons/siteadmin.svg";
import PriceRequestModal from "../../widgets/priceRequestModal/PriceRequestModal";

const HeaderTabs = ({activeTab} : any) => {
    const [showModal, setShowModal] = useState(false);

    const menuPermission = useSelector(
        (state: any) => state.userAuthorities.permissions.menu
    );

    const authenticatedUserPermission = useSelector(
        (state: any) => state.authenticatedUser.permissions.menu
    );

    const handleShowModal = () => setShowModal(false); //change it for coming soon modal
    const handleCloseModal = () => setShowModal(false);

    return(
        <div className="site-header-tab">
            <Nav as="ul">
                {
                    (menuPermission.dashboard.canView || authenticatedUserPermission.dashboard.canView) 
                    &&
                    <Nav.Item as="li">
                        <Link to="/dashboard" className={activeTab === 'studentdashboard' ? 'active-tab' : activeTab === 'teacherdashboard' ? 'active-tab' : ''}>
                            <img src={dashboardIcon} alt="Dashboard" />
                            <span>Dashboard</span>
                        </Link>              
                    </Nav.Item>
                }
                {
                    (menuPermission.calendar.canView || authenticatedUserPermission.calendar.canView)
                    &&
                    <Nav.Item as="li" >
                        <Link to="/calender" className={activeTab === 'calender' ? 'active-tab' : ''}>
                            <img src={calendarIcon} alt="Calendar" />
                            <span>Calendar</span>
                        </Link>             
                    </Nav.Item>
                }
                {
                    (menuPermission.performance.canView || authenticatedUserPermission.performance.canView)
                    &&
                    <Nav.Item as="li" onClick={handleShowModal}>
                        <Link to="/performance" className={activeTab === 'performance' ? 'active-tab' : ''}>
                            <img src={performanceIcon} alt="Performance" />
                            <span>Performance</span>
                        </Link>             
                    </Nav.Item>
                }
                {
                    (menuPermission.gradebook.canView || authenticatedUserPermission.gradebook.canView)
                    &&
                    <Nav.Item as="li">
                        <Link to="/gradebook" className={activeTab === 'gradebook' ? 'active-tab' : ''}>
                            <img src={gradeboolIcon} alt="Gradebook" />
                            <span>Gradebook</span>
                        </Link>             
                    </Nav.Item>
                }
                {
                    (menuPermission.attendance.canView || authenticatedUserPermission.attendance.canView)
                    &&
                    <Nav.Item as="li">
                        <Link to="/attendance" className={activeTab === 'attendance' ? 'active-tab' : ''}>
                            <img src={attendanceIcon} alt="Attendance" />
                            <span>Attendance</span>
                        </Link>             
                    </Nav.Item>
                }
                <Nav.Item as="li">
                    <Link to="/helpdesk" className={activeTab === 'helpdesk' ? 'active-tab' : ''}>
                        <img src={helpdeskIcon} alt="Helpdesk" />
                        <span>Helpdesk</span>
                    </Link>             
                </Nav.Item>
                {
                    (menuPermission.admin.canView)
                    &&
                    <Nav.Item as="li">
                        <Link to="/siteadmin" className={activeTab === 'siteadmin' ? 'active-tab' : ''}>
                            <img src={siteadminIcon} alt="Administation" />
                            <span>Administration</span>
                        </Link>             
                    </Nav.Item>
                }
            </Nav>
            <PriceRequestModal show={showModal} handleClose={handleCloseModal}/>
        </div>
    );
}

export default HeaderTabs;