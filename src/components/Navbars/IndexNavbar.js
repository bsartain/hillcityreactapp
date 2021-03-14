import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

import { useObserver } from 'mobx-react'
import SpecialAnnouncement from 'views/SpecialAnnouncement'

function IndexNavbar() {

  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [logo, setLogo] = useState('https://hillcitysc.com/wp-content/uploads/2021/02/HC-masthead-logo-white.png')
  

  useEffect(() => {

      const updateNavbarColor = () => {

      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("navbar-white");
        setLogo('https://hillcitysc.com/wp-content/uploads/2019/10/HC-masthead-logo.png')
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
        setLogo('https://hillcitysc.com/wp-content/uploads/2021/02/HC-masthead-logo-white.png')
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };

  }, []);


  return useObserver(() => (
    <>
      {/* {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null} */}
      <SpecialAnnouncement/>
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand to="/">
                <img src={logo} className="hc-logo" alt="Hill City Church: Rock Hill SC" />
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <Link exact="true" to="/" className="nav-link">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/gospel" className="nav-link">The Gospel</Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="nav-link">About</Link>
              </NavItem>
              <NavItem>
                <Link to="/faith" className="nav-link">Our Faith</Link>
              </NavItem>
              <NavItem>
                <Link to="/sermons" className="nav-link">Sermons</Link>
              </NavItem>
              <NavItem>
                <Link to="/live-stream" className="nav-link">Live Stream</Link>
              </NavItem>
              <NavItem>
                <Link to="/devotional" className="nav-link">Devotional</Link>
              </NavItem>
              <NavItem>
                <Link to="/contact" className="nav-link">Contact</Link>
              </NavItem>
              <NavItem>
                <Link to="/give" className="nav-link">Give</Link>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/hillcitysc"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  ))
}

export default IndexNavbar;
