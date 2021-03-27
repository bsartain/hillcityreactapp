import React, { useContext, useEffect } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { RefTagger } from "react-reftagger";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import spurgeon from "data/spurgeon";

function Devotional() {
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

  const setTodaysDevo = () => {
    // eslint-disable-next-line array-callback-return
    return spurgeon.map((item) => {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;

      today = mm + "/" + dd;

      if (item.date === today) {
        return (
          <div key={item.id} className="container">
            <div className="devotional-content" dangerouslySetInnerHTML={{ __html: item.body }}></div>
          </div>
        );
      }
    });
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 9196)
            .map((page, index) => {
              return (
                <div key={index}>
                  <RefTagger />
                  <PageHeader headerData={page} />
                  <div className="page-content-title">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  <div className="container" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                  <div className="devotional-container">{setTodaysDevo()}</div>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default Devotional;
