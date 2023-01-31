import React from 'react'
import { Container } from 'react-bootstrap'
import './style.scss';

const SiteFooter = () => {
  return (
    <>
        <div className="footer-wrapper">
        <Container>
          <nav className="footer-nav">
            <ul className="footer-list">
              <li>FAQ's</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
              <li><span><i className="fa-solid fa-copyright"></i></span> 2021 Ballistic University. All Rights Reserved.</li>
            </ul>
          </nav>
        </Container>
      </div>
    </>
  )
}

export default SiteFooter