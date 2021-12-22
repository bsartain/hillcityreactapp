import React, { useContext, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { runInAction } from 'mobx';

function FooterDrawer() {
  const [mediaPlayerHeight, setMediaPlayerHeight] = useState('auto');
  const store = useContext(StoreContext);

  const playerHeightTransition = () => {
    if (mediaPlayerHeight === 'auto') {
      setMediaPlayerHeight('100%');
    } else if (mediaPlayerHeight === '100%') {
      setMediaPlayerHeight('auto');
    }
  };

  const mediaPlayerInnerContainer = { flexDirection: mediaPlayerHeight === '100%' ? 'column' : 'inherit' };
  const setPlayerMediaDetails = {
    width: mediaPlayerHeight === '100%' ? '100%' : null,
    flexDirection: mediaPlayerHeight === '100%' ? 'column-reverse' : 'inherit',
    padding: mediaPlayerHeight === '100%' ? '20px' : null,
  };
  const setImage = !store.sermonStore.singleSermonData ? null : store.sermonStore.singleSermonData.featured_image.large;
  const setMediaPlayerImage =
    mediaPlayerHeight === '100%'
      ? { height: '300px', width: '100%', maxWidth: '500px', backgroundImage: 'url(' + setImage + ')' }
      : { height: '125px', width: '150px', backgroundImage: 'url(' + setImage + ')' };
  const setMediaPlayerSermonInfo =
    mediaPlayerHeight === '100%'
      ? { fontSize: '17px', marginLeft: '10px', marginTop: '15px', marginBottom: '15px', marginRight: '10px' }
      : { fontSize: '11px', marginLeft: '10px', marginTop: '0px', marginBottom: '0px', marginRight: '10px' };
  const setMediaPlayerRemove = mediaPlayerHeight === '100%' ? { marginRight: '2px' } : { marginRight: '25px' };

  const setTheMediaPlayer = () => {
    runInAction(() => {
      store.pagesStore.mediaPlayerIsDisplayed = false;
    });
  };

  return useObserver(() => (
    <>
      {!store.pagesStore.mediaPlayerIsDisplayed || !store.sermonStore.singleSermonData ? null : (
        <>
          {!store.sermonStore.singleSermonData ? (
            <h4>Loading...</h4>
          ) : (
            <div className="media-player-container" style={{ height: mediaPlayerHeight }} id="mediaPlayerContainer">
              <div className="media-player-inner-container" style={mediaPlayerInnerContainer}>
                <div className="media-player-details" style={setPlayerMediaDetails}>
                  <div className="media-player-img" style={setMediaPlayerImage}></div>
                  <div className="media-player-sermon-info" onClick={() => playerHeightTransition()} style={setMediaPlayerSermonInfo}>
                    <div className="media-player-expand">
                      <i className={`now-ui-icons arrows-1_minimal-${mediaPlayerHeight === '100%' ? 'down' : 'up'}`}></i>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: store.sermonStore.singleSermonData.title.rendered }} />
                    <hr />
                    <div>{store.sermonStore.singleSermonData.wpfc_preacher[1]}</div>
                  </div>
                </div>
                <AudioPlayer
                  autoPlay
                  className="media-player"
                  src={store.sermonStore.singleSermonData.sermon_audio}
                  onPlay={(e) => (store.pagesStore.isPlaying = true)}
                  onPause={(e) => (store.pagesStore.isPlaying = false)}
                  layout={mediaPlayerHeight === '100%' ? 'stacked-reversed' : 'horizontal-reverse'}
                  showFilledVolume={true}
                  customProgressBarSection={[RHAP_UI.PROGRESS_BAR, RHAP_UI.CURRENT_TIME, <div className="media-player-time-divider">/</div>, RHAP_UI.DURATION]}
                  width={'100%'}
                  customAdditionalControls={[]}
                />

                <div className="media-player-remove" onClick={() => setTheMediaPlayer()} style={setMediaPlayerRemove}>
                  <i className="now-ui-icons ui-1_simple-remove"></i>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  ));
}

export default FooterDrawer;
