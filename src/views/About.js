import React, { useContext, useEffect } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";

function About() {
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
      <div className="wrapper page-content-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 12)
            .map((page, index) => {
              return (
                <div key={index}>
                  <PageHeader headerData={page} />
                  <div className="page-content-title">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  <div className="container" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default About;
