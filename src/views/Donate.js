import React, { useContext, useEffect } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { RefTagger } from 'react-reftagger';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsTrackPage } from 'utils/utils';
import Meta from 'components/Meta';

function Faith() {
  const store = useContext(StoreContext);
  const history = useHistory();

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
  }, [history.location.pathname]);
  return useObserver(() => (
    <>
      <div className="wrapper page-content-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 10313)
            .map((page, index) => {
              return (
                <div key={index}>
                  <Meta title={page.title.rendered} description={page.content.rendered} image={page.better_featured_image.source_url} url={window.location.href} />
                  <RefTagger />
                  <PageHeader headerData={page} />
                  <div className="page-content-title">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  <div className="container" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                  <div className="container">
                    <a href="https://hillcitysc.churchcenter.com/giving?open-in-church-center-modal=true" className="btn btn-primary btn-lg">
                      Give
                    </a>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default Faith;
