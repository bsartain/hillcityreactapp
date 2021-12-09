import React, { useState, useRef, useEffect, useContext } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { OrderOfService } from 'views/OrderOfService';
import { nextSundaysDate } from 'utils/utils';
import ReactToPrint from 'react-to-print';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { runInAction } from 'mobx';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsTrackPage } from 'utils/utils';
import ReactGA from 'react-ga';
import Meta from 'components/Meta';
import ConnectCard from '../components/ConnectCard';

function LiveStream() {
  const ref = useRef(true);
  const history = useHistory();

  const store = useContext(StoreContext);

  const [sundayDate, setSundayDate] = useState('');
  const [printLogo, setPrintLogo] = useState(false);

  useEffect(() => {
    async function getOrderOfService() {
      const orderOfServiceDataResponse = await fetch('https://hillcitysc.com/wp-json/acf/v3/posts/8857');
      const orderOfServiceData = await orderOfServiceDataResponse;
      const { acf } = orderOfServiceData;
      runInAction(() => {
        store.orderOfServiceData = [acf];
      });
    }
    getOrderOfService();

    async function getSundaysDate() {
      const thisSundaysDate = await nextSundaysDate();
      setSundayDate(thisSundaysDate);
    }
    getSundaysDate();

    googleAnalyticsTrackPage(history.location.pathname);

    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
      ref.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  const pageStyle = `
  @page {
    size: 80mm 50mm;
  }
  @media all {
    .pagebreak {
      display: none;
    }
  }
  @media print {
    .pagebreak {
      page-break-before: always;
    }
    .scripture-reading-container p{
      font-size: 25px;
    }
    .show-announcements span{
      font-size: 25px;
    }
    .content-order-service p{
      font-size: 25px;
    }
    .print-order-service{
      margin-left: 25px
    }
    .order-service-hr{
      margin: 50px 50px;
    }
  }
`;

  const gaClickPrintBulletin = () => {
    ReactGA.event({
      category: 'Live Stream Page',
      action: 'User clicked button to print order of service',
    });
  };

  const gaClickYoutube = () => {
    ReactGA.event({
      category: 'Live Stream Page',
      action: 'User clicked watch live on YouTube',
    });
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container live-stream-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 8857)
            .map((page, index) => {
              const youtubeLink = page.acf.youtube_link;
              const parsedLink = youtubeLink.substring(17);
              return (
                <div key={index}>
                  <Meta title={page.title.rendered} description={page.content.rendered} image={page.better_featured_image.source_url} url={window.location.href} />
                  <PageHeader headerData={page} />
                  <div className="page-content-title container">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                    <h3>WELCOME! OUR SERVICE WILL BEGIN AT 10:00 AM ON {sundayDate}</h3>
                  </div>
                  <div className="container live-stream-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                  <div className="youtube">
                    {page.acf.youtube_link ? (
                      <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${parsedLink}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : null}
                  </div>
                  <div className="container react-print-container">
                    <div className="media-buttons-container">
                      {page.acf.youtube_link ? (
                        <a
                          className="btn btn-primary youtube-btn media-button"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.youtube.com/watch?v=${parsedLink}`}
                          onClick={() => gaClickYoutube()}
                        >
                          <i className="fab fa-youtube"></i> Watch On YouTube
                        </a>
                      ) : null}
                      <ReactToPrint
                        trigger={() => (
                          <button className="btn btn-primary media-button">
                            <i className="fas fa-print"></i> Print Order Of Service
                          </button>
                        )}
                        content={() => ref.current}
                        onBeforeGetContent={() => {
                          setPrintLogo(true);
                          gaClickPrintBulletin();
                        }}
                        onAfterPrint={() => setPrintLogo(false)}
                        pageStyle={pageStyle}
                      />
                      <ConnectCard />
                    </div>
                    {store.pagesStore.orderOfServiceData.length === 0 ? <SpinnerFullPage /> : <OrderOfService ref={ref} printLogo={printLogo} />}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default LiveStream;
