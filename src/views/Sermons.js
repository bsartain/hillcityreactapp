import React, { useState, useEffect, useContext } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { SermonContent } from "views/SermonContent";
import { Pagination } from "views/Pagination";
import SermonFilter from "views/index-sections/SermonFilter";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import { useHistory } from "react-router-dom";
import { googleAnalyticsTrackPage } from "utils/utils";
import Meta from "components/Meta";
import { Spinner } from "reactstrap";

function Sermons() {
  const store = useContext(StoreContext);
  const history = useHistory();

  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    googleAnalyticsTrackPage(history.location.pathname);

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [store, history.location.pathname]);

  let currentSermons;

  if (store && store.sermonStore.sermonData && store.sermonStore.sermonData.length > 0) {
    const indexOfLastSermon = currentPage * postsPerPage;
    const indexOfFirstSermon = indexOfLastSermon - postsPerPage;
    const pagesStore = store.sermonStore.sermonData;
    currentSermons = pagesStore.slice(indexOfFirstSermon, indexOfLastSermon);
  }

  const paginate = (number) => setCurrentPage(number);

  return useObserver(() => (
    <>
      {store.sermonStore.sermonData.length === 0 ? <SpinnerFullPage /> : null}
      <div className="wrapper page-content-container">
        <>
          <div>
            {store.sermonStore.sermonData.length > 0 ? <PageHeader headerData={null} sermonHeaderData={store.sermonStore.sermonData[0]} /> : null}
            {store.sermonStore.sermonData.length === 0 ? (
              <Spinner />
            ) : (
              <div className="page-content-title">
                <Meta
                  title={"Sermons | Hill City Church | Rock Hill SC"}
                  description={"Hill City Church delivers relevent sermons directly from the scriptures to highlight what God has done for us through Jesus Christ"}
                  image={store.sermonStore.sermonData[0]._featured_url}
                  url={window.location.href}
                />
                <h2 className="container">Current Sermons</h2>
                <hr className="page-content-hr" />
                <SermonFilter />
                {store.sermonStore.sermonData.length === 0 ? <h4>There are currently no results for this search</h4> : null}
              </div>
            )}
          </div>
          {store.sermonStore.sermonData.length > 0 ? (
            <>
              <SermonContent sermonData={currentSermons} loading={loading} />
              <div className="container">
                <Pagination sermonsPerPage={postsPerPage} totalSermons={store.sermonStore.sermonData.length} paginate={paginate} />
              </div>
            </>
          ) : null}
        </>
      </div>
    </>
  ));
}

export default Sermons;
