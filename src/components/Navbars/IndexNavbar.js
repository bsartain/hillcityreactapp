import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { runInAction } from 'mobx';
import { StoreContext } from 'stores/StoreContext';
import { useObserver } from 'mobx-react';
import SpecialAnnouncement from 'views/SpecialAnnouncement';
import { HexColorPicker } from 'react-colorful';
import { useHistory } from 'react-router';

function IndexNavbar() {
  const history = useHistory();
  const store = useContext(StoreContext);
  const [navbarColor, setNavbarColor] = useState('navbar-transparent');
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [logo, setLogo] = useState('https://hillcitysc.com/wp-content/uploads/2021/02/HC-masthead-logo-white.png');

  useEffect(() => {
    console.log('EFFECT: ');
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 399 || document.body.scrollTop > 399) {
        setNavbarColor('navbar-white');
        setLogo('https://hillcitysc.com/wp-content/uploads/2019/10/HC-masthead-logo.png');
      } else if (document.documentElement.scrollTop < 400 || document.body.scrollTop < 400) {
        setNavbarColor('navbar-transparent');
        setLogo('https://hillcitysc.com/wp-content/uploads/2021/02/HC-masthead-logo-white.png');
      }
    };
    window.addEventListener('scroll', updateNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  }, []);

  const adjustFontSize = (increase, store) => {
    runInAction(() => {
      increase === 'increment' ? (store.customFontSize = store.customFontSize + 1) : (store.customFontSize = store.customFontSize - 1);
    });
  };

  return useObserver(() => (
    <>
      <SpecialAnnouncement />
      <Navbar className={'fixed-top ' + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand to="/">
              <img src={logo} className="hc-logo" alt="Hill City Church | Rock Hill SC" />
            </NavbarBrand>

            <button className="font-adjust" id="PopoverClick" type="button">
              {history.location.pathname === '/live-stream' ? 'Aa' : null}
            </button>

            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle('nav-open');
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
          <UncontrolledPopover placement="bottom" target="PopoverClick" trigger="legacy">
            <PopoverBody>
              <h3 className="font-adjust-header">Adjust Font</h3>
              <div className="font-adjust-buttons">
                <div className="small-a" onClick={() => adjustFontSize('decrement', store.pagesStore.customFont[0])}>
                  A
                </div>
                <div className="big-a" onClick={() => adjustFontSize('increment', store.pagesStore.customFont[0])}>
                  A
                </div>
              </div>
              <HexColorPicker
                color={store.pagesStore.customFont[0].customFontColor}
                onChange={(e) => {
                  runInAction(() => {
                    store.pagesStore.customFont[0].customFontColor = e;
                  });
                }}
              />
              <button
                className="big-a btn btn-primary btn-block reset-button"
                onClick={() =>
                  runInAction(() => {
                    store.pagesStore.customFont[0].customFontSize = 16;
                    store.pagesStore.customFont[0].customFontColor = '#737373';
                  })
                }
              >
                RESET
              </button>
            </PopoverBody>
          </UncontrolledPopover>
          <Collapse className="justify-content-end" isOpen={collapseOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link exact="true" to="/" className="nav-link">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/gospel" className="nav-link">
                  The Gospel
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/faith" className="nav-link">
                  Our Faith
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/sermons" className="nav-link">
                  Sermons
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/live-stream" className="nav-link">
                  Live Stream
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/devotional" className="nav-link">
                  Devotional
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/contact" className="nav-link">
                  Service Times/Contact
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/small-groups" className="nav-link">
                  Small Groups
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/donate" className="nav-link">
                  Give
                </Link>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.facebook.com/hillcitysc" target="_blank" id="facebook-tooltip">
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  ));
}

export default IndexNavbar;
