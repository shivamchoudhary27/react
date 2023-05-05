import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./style.scss";
import dashboardIcon from "../../assets/images/icons/dashboard.svg";
import calendarIcon from "../../assets/images/icons/calendar.svg";
import performanceIcon from "../../assets/images/icons/performance.svg";
import gradeboolIcon from "../../assets/images/icons/gradebook.svg";
import attendanceIcon from "../../assets/images/icons/attendance.svg";
import helpdeskIcon from "../../assets/images/icons/helpdesk.svg";
import siteadminIcon from "../../assets/images/icons/siteadmin.svg";

const HeaderTabs = () => {
    return(
        <div className="site-header-tab">
            <Nav as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={dashboardIcon} alt="Dashboard" />
                        <span>Dashboard</span>
                    </Nav.Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={calendarIcon} alt="Calendar" />
                        <span>Calendar</span>
                    </Nav.Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={performanceIcon} alt="Performance" />
                        <span>Performance</span>
                    </Nav.Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={gradeboolIcon} alt="Gradebook" />
                        <span>Gradebook</span>
                    </Nav.Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={attendanceIcon} alt="Attendance" />
                        <span>Attendance</span>
                    </Nav.Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={helpdeskIcon} alt="Helpdesk" />
                        <span>Helpdesk</span>
                    </Nav.Link>             
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#">
                        <img src={siteadminIcon} alt="Helpdesk" />
                        <span>Administration</span>
                    </Nav.Link>             
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default HeaderTabs;