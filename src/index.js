/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "views/Index.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import NucleoIcons from "views/NucleoIcons.js"
import LandingPage from "views/examples/LandingPage.js"
import ProfilePage from "views/examples/ProfilePage.js"
import About from 'views/About'
import Gospel from 'views/Gospel'
import Faith from 'views/Faith'
import Contact from 'views/Contact'
import LiveStream from "views/LiveStream"
import Give from 'views/Give'
import Sermons from 'views/Sermons'
import SingleSermon from 'views/SingleSermon'
import DarkFooter from "components/Footers/DarkFooter.js"
import FooterDrawer from 'components/Footers/FooterDrawer'
import PaymentSuccess from "views/PaymentSuccess";
import PaymentFailed from "views/PaymentFailed";
import ConnectionSignup from 'views/ConnectionSignup'
import Devotional from 'views/Devotional'

import { useLocalObservable } from "mobx-react"
import { 
  getPagesData, 
  getHomePageData, 
  getSermonDataService,
  getSermonPreacher,
  getSermonSeries,
  getSermonBibleBooks,
  getOrderOfServiceData
} from 'services/services'

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {

  const store = useLocalObservable(() => ({
    mediaPlayerIsDisplayed: false,
    singleSermonData: null,
    isPlaying: false,
    pagesData: [],
    homePageData: [],
    sermonData: [],
    getPagesData: getPagesData(),
    getHomePageData: getHomePageData(),
    getSermonData: (url) => {
      return getSermonDataService(url)
    }, 
    sliceSermonData: (sermonData, indexOfFirstSermon, indexOfLastSermon) => {
      let slicedData
      if(sermonData.length !== 0){
        slicedData = sermonData.slice(indexOfFirstSermon, indexOfLastSermon)
      }
      return slicedData
    },
    getSermonPreacher: getSermonPreacher(),
    getSermonSeries: getSermonSeries(),
    getSermonBibleBooks: getSermonBibleBooks(),
    sermonPreacher: [],
    sermonSeries: [],
    sermonBibleBooks: [],
    selectedPreacherId: '',
    selectedSeriesId: '',
    selectedBookId: '',
    getOrderOfServiceData: getOrderOfServiceData(),
    orderOfServiceData: []
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );

};

ReactDOM.render(
  <StoreProvider>
    <HashRouter>
      <IndexNavbar />
      <Switch>
        <Switch>
          <Route exact={true} path="/" render={(props) => <Index {...props} />} />
          <Route
            path="/gospel"
            render={(props) => <Gospel {...props} />}
          />
          <Route
            path="/about"
            render={(props) => <About {...props} />}
          />
          <Route
            path="/faith"
            render={(props) => <Faith {...props} />}
          />
          <Route
            path="/sermons"
            render={(props) => <Sermons {...props} />}
          />
          <Route
            path="/contact"
            render={(props) => <Contact {...props} />}
          />
          <Route
            path="/live-stream"
            render={(props) => <LiveStream {...props} />}
          />
          <Route
            path="/give"
            render={(props) => <Give {...props} />}
          />
          <Route
            path="/nucleo-icons"
            render={(props) => <NucleoIcons {...props} />}
          />
          <Route
            path="/landing-page"
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            path="/profile-page"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route
            path="/payment-success"
            render={(props) => <PaymentSuccess {...props} />}
          />
          <Route
            path="/payment-failed"
            render={(props) => <PaymentFailed {...props} />}
          />
          <Route
            path="/single-sermon/:id"
            render={(props) => <SingleSermon {...props}/>}
          />
          <Route
            path="/connection-signup"
            render={(props) => <ConnectionSignup {...props} />}
          />
          <Route
            path="/devotional"
            render={(props) => <Devotional {...props} />}
          />
          <Redirect to="/" />
          <Redirect from="/" to="/" />
        </Switch>
      </Switch>
      <DarkFooter />
      <FooterDrawer />
    </HashRouter>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
