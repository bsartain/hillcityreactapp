import React, { useContext, useEffect } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { RefTagger } from 'react-reftagger';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsTrackPage } from 'utils/utils';
import Meta from 'components/Meta';

function Audrey() {
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

  const html_entity_decode = (title) => {
    var element = document.createElement('div');
    element.innerHTML = title;
    return element.innerHTML;
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 10425)
            .map((page, index) => {
              return (
                <div key={index}>
                  <Meta title={page.title.rendered} description={page.content.rendered} image={page.better_featured_image.source_url} url={window.location.href} />
                  <RefTagger />
                  <PageHeader headerData={page} />
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/xFoibNgtclU"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ marginTop: '-50px' }}
                  ></iframe>
                  <div className="page-content-title">
                    <h2 className="container">{html_entity_decode(page.title.rendered)}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  <div className="container" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />;
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default Audrey;
