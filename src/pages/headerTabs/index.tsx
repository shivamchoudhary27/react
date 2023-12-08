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

const HeaderTabs = ({activeTab} : any) => {
    const menuPermission = useSelector(
        (state: any) => state.userAuthorities.permissions.menu
    );

    return(
        <div className="site-header-tab">
            <Nav as="ul">
                {
                    menuPermission.dashboard.canView 
                    &&
                    <Nav.Item as="li">
                        <Link to="/dashboard" className={activeTab === 'studentdashboard' ? 'active-tab' : activeTab === 'teacherdashboard' ? 'active-tab' : ''}>
                            <img src={dashboardIcon} alt="Dashboard" />
                            <span>Dashboard</span>
                        </Link>              
                    </Nav.Item>
                }
                {
                    menuPermission.calendar.canView
                    &&
                    <Nav.Item as="li" >
                        <Link to="/calender" className={activeTab === 'calender' ? 'active-tab' : ''}>
                            <img src={calendarIcon} alt="Calendar" />
                            <span>Calendar</span>
                        </Link>             
                    </Nav.Item>
                }
                {
                    menuPermission.performance.canView
                    &&
                    <Nav.Item as="li">
                        <Link to="" className={activeTab === 'performance' ? 'active-tab' : ''}>
                            <img src={performanceIcon} alt="Performance" />
                            <span>Performance</span>
                        </Link>             
                    </Nav.Item>
                }
                {
                    menuPermission.gradebook.canView
                    &&
                    <Nav.Item as="li">
                        <Link to="/gradebook" className={activeTab === 'gradebook' ? 'active-tab' : ''}>
                            <img src={gradeboolIcon} alt="Gradebook" />
                            <span>Gradebook</span>
                        </Link>             
                    </Nav.Item>
                }
                {
                    menuPermission.attendance.canView
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
                    menuPermission.admin.canView
                    &&
                    <Nav.Item as="li">
                        <Link to="/siteadmin" className={activeTab === 'siteadmin' ? 'active-tab' : ''}>
                            <img src={siteadminIcon} alt="Administation" />
                            <span>Administration</span>
                        </Link>             
                    </Nav.Item>
                }
            </Nav>
        </div>
    );
}

export default HeaderTabs;