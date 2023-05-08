import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from "react-router-dom";
import "./style.scss";
import dashboardIcon from "../../assets/images/icons/dashboard.svg";
import calendarIcon from "../../assets/images/icons/calendar.svg";
import performanceIcon from "../../assets/images/icons/performance.svg";
import gradeboolIcon from "../../assets/images/icons/gradebook.svg";
import attendanceIcon from "../../assets/images/icons/attendance.svg";
import helpdeskIcon from "../../assets/images/icons/helpdesk.svg";
import siteadminIcon from "../../assets/images/icons/siteadmin.svg";

const HeaderTabs = () => {
    const location = useLocation();
    return(
        <div className="site-header-tab">
            <Nav as="ul">
                <Nav.Item as="li">
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active-tab' : ''}>
                        <img src={dashboardIcon} alt="Dashboard" />
                        <span>Dashboard</span>
                    </Link>             
                </Nav.Item>
                <Nav.Item as="li" >
                    <Link to="/calender" className={location.pathname === '/calender' ? 'active-tab' : ''}>
                        <img src={calendarIcon} alt="Calendar" />
                        <span>Calendar</span>
                    </Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/studentdashboard" className={location.pathname === '/studentdashboard' ? 'active-tab' : ''}>
                        <img src={performanceIcon} alt="Performance" />
                        <span>Performance</span>
                    </Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/teacherdashboard" className={location.pathname === '/teacherdashboard' ? 'active-tab' : ''}>
                        <img src={gradeboolIcon} alt="Gradebook" />
                        <span>Gradebook</span>
                    </Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="">
                        <img src={attendanceIcon} alt="Attendance" />
                        <span>Attendance</span>
                    </Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="">
                        <img src={helpdeskIcon} alt="Helpdesk" />
                        <span>Helpdesk</span>
                    </Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/siteadmin" className={location.pathname === '/siteadmin' ? 'active-tab' : ''}>
                        <img src={siteadminIcon} alt="Helpdesk" />
                        <span>Administration</span>
                    </Link>             
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default HeaderTabs;