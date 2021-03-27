import React, { useContext, useEffect } from "react";

import IndexHeader from "components/Headers/IndexHeader.js";
import HomePageSection from "./index-sections/HomepageSections";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";

function Index() {
  const store = useContext(StoreContext);

  useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return useObserver(() => (
    <>
      {store.pagesStore.homePageData.length === 0 ? (
        <SpinnerFullPage />
      ) : (
        <div className="wrapper">
          <IndexHeader headerData={store.pagesStore.homePageData} />
          <HomePageSection />
        </div>
      )}
    </>
  ));
}

export default Index;
