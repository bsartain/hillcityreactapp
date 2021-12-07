import React, { useContext } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { formatDate } from "utils/utils";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import { runInAction } from "mobx";

function MediaDrawer() {
  const store = useContext(StoreContext);

  const setBackgroundImage = (data) => {
    const image = data.featured_image.large;
    const setMediaPlayerImage = { height: "125px", width: "150px", backgroundImage: "url(" + image + ")", backgroundSize: "cover", backgroundPosition: "center" };
    return <div className="media-player-img" style={setMediaPlayerImage}></div>;
  };

  const setTheMediaPlayer = () => {
    runInAction(() => {
      store.pagesStore.mediaPlayerIsDisplayed = false;
      store.pagesStore.isPlaying = false;
    });
  };

  return useObserver(() =>
    store.sermonStoreTwo.singleSermonData.length === 0 ? null : (
      <div>
        {!store.pagesStore.mediaPlayerIsDisplayed ? null : (
          <div className="media-player-container">
            <div className="media-player-inner-container">
              <div className="media-player-details">
                {setBackgroundImage(store.sermonStoreTwo.singleSermonData)}
                <div className="media-player-sermon-info">
                  <div dangerouslySetInnerHTML={{ __html: store.sermonStoreTwo.singleSermonData.title }} />
                  <hr />
                  <div style={{ display: "flex" }}>
                    <div style={{ borderRight: "1px solid #515151", marginRight: "5px", paddingRight: "5px" }}>{store.sermonStoreTwo.singleSermonData.preacher.map((item) => item.name)}</div>
                    <div>{formatDate(store.sermonStoreTwo.singleSermonData.date)}</div>
                  </div>
                </div>
              </div>
              <AudioPlayer
                autoPlay
                className="media-player"
                src={store.sermonStoreTwo.singleSermonData.sermon_audio}
                onPlay={(e) => (store.pagesStore.isPlaying = true)}
                onPause={(e) => (store.pagesStore.isPlaying = false)}
                layout={"horizontal-reverse"}
                showFilledVolume={true}
                customProgressBarSection={[RHAP_UI.PROGRESS_BAR, RHAP_UI.CURRENT_TIME, <div className="media-player-time-divider">/</div>, RHAP_UI.DURATION]}
                width={"100%"}
                customAdditionalControls={[]}
              />
              <div className="media-player-remove" onClick={() => setTheMediaPlayer()}>
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default MediaDrawer;
