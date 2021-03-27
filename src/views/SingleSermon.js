import React, { useState, useContext, useEffect } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { formatDate } from "utils/utils";
import { setPreacher, setSermonSeries } from "views/SermonContent";

import { useObserver } from "mobx-react";
import { runInAction, observable } from "mobx";
import { StoreContext } from "stores/StoreContext";
import { esvApi } from "utils/utils";
import { RefTagger } from "react-reftagger";
import { useHistory } from "react-router-dom";

function SingleSermon(props) {
  const store = useContext(StoreContext);

  const [biblePassage, setBiblePassage] = useState([]);

  const history = useHistory();

  const pagesDataArr = observable(store.pagesStore.pagesData);
  pagesDataArr.filter((todo) => todo.id === 8497);

  useEffect(() => {
    async function fetchSingleSermonData() {
      const url = await history.location.pathname;
      const sermonId = await url.substring(url.lastIndexOf("/") + 1);
      const response = await fetch(`https://hillcitysc.com/wp-json/wp/v2/wpfc_sermon/${sermonId}`);
      const singleSermonData = await response.json();
      await runInAction(() => {
        store.sermonStore.singleSermonData = singleSermonData;
      });
      const bibleResponse = await esvApi(store.sermonStore.singleSermonData.bible_passage);
      setBiblePassage(bibleResponse);
    }
    fetchSingleSermonData();

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [store.sermonStore.singleSermonData, history.location.pathname, store.sermonStore]);

  const getMediaPlayer = async () => {
    runInAction(() => {
      store.pagesStore.mediaPlayerIsDisplayed = true;
      store.pagesStore.isPlaying = !store.pagesStore.isPlaying;
    });
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container single-sermon-container">
        {!store.sermonStore.singleSermonData ? (
          <SpinnerFullPage />
        ) : (
          <div>
            <RefTagger noSearchTagNames={["h1", "h2", "h3", "h4", "h5"]} bibleVersion={"ESV"} />
            <PageHeader headerData={store.sermonStore.singleSermonData} />
            <div className="page-content-title">
              <p>{formatDate(store.sermonStore.singleSermonData.date)}</p>
              <h2
                className="container"
                dangerouslySetInnerHTML={{
                  __html: store.sermonStore.singleSermonData.title.rendered,
                }}
              />
              <hr className="page-content-hr" />
            </div>
            <div className="single-sermon-details container">
              <div>
                <p>
                  <span className="item-detail">Preacher: </span>
                  {setPreacher(store.sermonStore.singleSermonData.wpfc_preacher)}{" "}
                </p>
              </div>
              <div>
                <p>
                  <span className="item-detail">Series:</span> {setSermonSeries(store.sermonStore.singleSermonData.wpfc_sermon_series)}
                </p>
              </div>
              <div>
                <p>
                  <span className="item-detail">Passage:</span> {store.sermonStore.singleSermonData.bible_passage}
                </p>
              </div>
            </div>
            <div
              className="container single-sermon-play-button"
              onClick={() => {
                getMediaPlayer();
              }}
            >
              <i className={store.pagesStore.isPlaying ? "now-ui-icons media-1_button-pause" : "now-ui-icons media-1_button-play"}></i>
            </div>
            <hr />
            <div className="container single-sermon-bible-container">
              {biblePassage.length === 0 ? null : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: biblePassage.passages.map((verses) => verses),
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  ));
}

export default SingleSermon;
