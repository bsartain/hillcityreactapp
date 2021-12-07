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

  if (store && store.sermonStoreTwo.sermonData && store.sermonStoreTwo.sermonData.length > 0) {
    const indexOfLastSermon = currentPage * postsPerPage;
    const indexOfFirstSermon = indexOfLastSermon - postsPerPage;
    const pagesStore = store.sermonStoreTwo.sermonData;
    currentSermons = pagesStore.slice(indexOfFirstSermon, indexOfLastSermon);
  }

  const paginate = (number) => setCurrentPage(number);

  return useObserver(() => (
    <>
      {store.sermonStoreTwo.sermonData.length === 0 ? <SpinnerFullPage /> : null}
      <div className="wrapper page-content-container">
        <>
          <div>
            {store.sermonStoreTwo.sermonData.length > 0 ? <PageHeader headerData={null} sermonHeaderData={store.sermonStoreTwo.sermonData[0]} /> : null}
            {store.sermonStoreTwo.sermonData.length === 0 ? (
              <div className="spinner-sermons">
                <div>
                  <h4>Sermons Loading...</h4>
                  <Spinner />
                </div>
              </div>
            ) : (
              <div className="page-content-title">
                <Meta
                  title={"Sermons | Hill City Church | Rock Hill SC"}
                  description={"Hill City Church delivers relevent sermons directly from the scriptures to highlight what God has done for us through Jesus Christ"}
                  image={store.sermonStoreTwo.sermonData[0].featured_image.large}
                  url={window.location.href}
                />
                <h2 className="container">Current Sermons</h2>
                <hr className="page-content-hr" />
                <SermonFilter />
                {store.sermonStoreTwo.sermonsEmpty === true ? <h4>There are currently no results for this search</h4> : null}
              </div>
            )}
          </div>
          {store.sermonStoreTwo.sermonData.length > 0 && !store.sermonStoreTwo.sermonsEmpty ? (
            <>
              <SermonContent sermonData={currentSermons} loading={loading} />
              <div className="container">
                <Pagination sermonsPerPage={postsPerPage} totalSermons={store.sermonStoreTwo.sermonData.length} paginate={paginate} />
              </div>
            </>
          ) : null}
        </>
      </div>
    </>
  ));
}

export default Sermons;
