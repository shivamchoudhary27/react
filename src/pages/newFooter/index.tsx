import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss"

const Footer = () => {
    return (
        <div className="site-footer">
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item">FAQ's</li>
                <li className="list-group-item">Terms & Conditions</li>
                <li className="list-group-item">Privacy Policy</li>
                <li className="list-group-item">Disclaimer</li>
                <li className="list-group-item">Copyright © 2023 Ballistic Learning Pvt Ltd. All rights reserved.</li>
            </ul>
        </div>
    );
}
export default Footer;
