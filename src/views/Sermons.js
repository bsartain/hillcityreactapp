import React, { useState, useEffect, useContext } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { SermonContent } from 'views/SermonContent';
import { Pagination } from 'views/Pagination';
import SermonFilter from 'views/index-sections/SermonFilter';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsTrackPage } from 'utils/utils';
import Meta from 'components/Meta';
import { Spinner } from 'reactstrap';

function Sermons() {
  const store = useContext(StoreContext);
  const history = useHistory();

  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    googleAnalyticsTrackPage(history.location.pathname);

    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
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
              <div className="spinner-sermons">
                <div>
                  <h4>Sermons Loading...</h4>
                  <Spinner />
                </div>
              </div>
            ) : (
              <div className="page-content-title">
                <Meta
                  title={'Sermons | Hill City Church | Rock Hill SC'}
                  description={'Hill City Church delivers relevent sermons directly from the scriptures to highlight what God has done for us through Jesus Christ'}
                  image={store.sermonStore.sermonData[0].featured_image.large}
                  url={window.location.href}
                />
                <div className="sermon-podcast-blurb">
                  All sermon audio is available for free on iTunes or your favorite podcast app.
                  <br /> Simply subscribe to the Hill City Church Audio podcast.
                  <div>
                    <div className="podcast-icons">
                      <a href="https://podcasts.apple.com/us/podcast/hill-city-church-rock-hill-sc/id1529110625" target="_blank" rel="noreferrer">
                        <i className="fab fa-itunes"></i>
                      </a>
                      <a href="https://open.spotify.com/show/689D8k7FZnLQe1KZTJKEZh?si=73dccf8187964e6c" target="_blank" rel="noreferrer">
                        <i className="fab fa-spotify"></i>
                      </a>
                      <a href="https://podcasts.apple.com/us/podcast/hill-city-church-rock-hill-sc/id1529110625" target="_blank" rel="noreferrer">
                        <i className="fas fa-podcast"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <h2 className="container">Current Sermons</h2>
                <hr className="page-content-hr" />
                <SermonFilter />
                {store.sermonStore.sermonsEmpty === true ? <h4>There are currently no results for this search</h4> : null}
              </div>
            )}
          </div>
          {store.sermonStore.sermonData.length > 0 && !store.sermonStore.sermonsEmpty ? (
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
