import React, { useState, useContext, useEffect } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { formatDate } from 'utils/utils';

import { useObserver } from 'mobx-react';
import { runInAction } from 'mobx';
import { StoreContext } from 'stores/StoreContext';
import { esvApi } from 'utils/utils';
import { RefTagger } from 'react-reftagger';
import { useHistory } from 'react-router-dom';
import Meta from 'components/Meta';
import ReactGA from 'react-ga';

function SingleSermon(props) {
  const store = useContext(StoreContext);
  const [biblePassage, setBiblePassage] = useState([]);
  const history = useHistory();
  const urlId = history.location.pathname.split('/').pop();

  useEffect(() => {
    async function fetchSingleSermonData() {
      window.scrollTo(0, 0);
      const response = await fetch('https://hillcitysc.com/wp-json/hc/v1/hc-sermons');
      const json = await response.json();
      await json
        .filter((item) => item.id === parseInt(urlId))
        .map((item) => {
          return runInAction(() => {
            store.sermonStore.singleSermonData = item;
          });
        });
      const biblePassage = await json.filter((item) => item.id === parseInt(urlId)).map((item) => item.bible_passage);
      const bibleResponse = await esvApi(biblePassage);
      setBiblePassage(bibleResponse.passages);
    }
    fetchSingleSermonData();

    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
    };
  }, [history.location.pathname, urlId, store.sermonStore]);

  const getMediaPlayer = async () => {
    runInAction(() => {
      store.pagesStore.mediaPlayerIsDisplayed = true;
      store.pagesStore.isPlaying = true;
    });
  };

  const setGASermon = (singleSermon) => {
    ReactGA.event({
      category: 'Sermons',
      action: 'User clicked play button on sermon',
      sermonTitle: singleSermon.title,
      sermonId: singleSermon.id,
      sermonPreacher: singleSermon.preacher.length > 0 ? singleSermon.preacher[0].name : null,
      sermonSeries: singleSermon.sermon_series.length > 0 ? singleSermon.sermon_series[0].name : null,
    });
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container single-sermon-container">
        {store.sermonStore.sermonData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.sermonStore.sermonData
            .filter((item) => item.id === parseInt(urlId))
            .map((singleSermon) => {
              return (
                <div key={singleSermon.id}>
                  <Meta title={singleSermon.title} description={singleSermon.sermon_series[0].name} image={singleSermon.featured_image.large} url={history.location.pathname} />
                  <RefTagger noSearchTagNames={['h1', 'h2', 'h3', 'h4', 'h5']} bibleVersion={'ESV'} />
                  <PageHeader headerData={null} sermonHeaderData={singleSermon} />
                  <div className="page-content-title">
                    <p>{formatDate(singleSermon.date)}</p>
                    <h2
                      className="container"
                      dangerouslySetInnerHTML={{
                        __html: singleSermon.title,
                      }}
                    />
                  </div>
                  <div className="single-sermon-details container">
                    <div>
                      <p>
                        <span className="item-detail">Preacher: </span>
                        {singleSermon.preacher.map((item) => item.name)}{' '}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="item-detail">Series:</span> {singleSermon.sermon_series.map((item) => item.name)}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="item-detail">Passage:</span> {singleSermon.bible_passage}
                      </p>
                    </div>
                    {singleSermon.small_group_questions ? (
                      <div>
                        <p>
                          <span className="item-detail">Small Group Questions:</span>{' '}
                          <a href={singleSermon.small_group_questions} target="_blank" rel="noreferrer">
                            <i className="far fa-file-pdf pdf-small-group-icon"></i>
                          </a>
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="container single-sermon-play-button"
                    onClick={() => {
                      getMediaPlayer();
                      setGASermon(singleSermon);
                    }}
                  >
                    <i className={'now-ui-icons media-1_button-play'}></i>
                  </div>
                  <hr />
                  <div className="container single-sermon-bible-container">
                    {biblePassage.length === 0 ? null : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: biblePassage.map((verses) => verses),
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default SingleSermon;
