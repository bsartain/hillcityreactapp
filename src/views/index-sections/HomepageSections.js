import React, { useEffect, useContext, useState } from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import Spinner from 'components/Spinner/Spinner';

import { StoreContext } from 'stores/StoreContext';
import { useObserver } from 'mobx-react';
import { runInAction } from 'mobx';
import { formatDate } from 'utils/utils';

// core components

function HomepageSections() {
  const store = useContext(StoreContext);
  const [footerContent, setfooterContent] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);

    async function getFooterContent() {
      fetch('https://hillcitysc.com/wp-json/acf/v3/posts/9262')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setfooterContent(data);
        });
    }
    getFooterContent();
  }, []);

  const openLatestSermon = (store) => {
    runInAction(() => {
      store.sermonStore.singleSermonData = store.sermonStore.sermonData[0];
      store.pagesStore.mediaPlayerIsDisplayed = true;
      store.pagesStore.isPlaying = true;
    });
  };

  const setLatestSermon = (store) => {
    if (store.sermonStore.sermonData.length !== 0) {
      const latestSermon = store.sermonStore.sermonData[0];
      return (
        <div
          className="latest-sermon-container"
          style={{
            backgroundImage: 'url(' + latestSermon.featured_image.large + ')',
          }}
        >
          <div className="latest-sermon-opacity-background"></div>
          <div className="latest-sermon-content">
            <h2>Latest Sermon</h2>
            <i className="fas fa-play-circle" onClick={() => openLatestSermon(store)}></i>
            <p>{latestSermon.title}</p>
            <p>{latestSermon.sermon_series.map((item) => item.name)}</p>
            <p>{latestSermon.preacher.map((item) => item.name)}</p>
            <p>{formatDate(latestSermon.date)}</p>
          </div>
        </div>
      );
    }
  };

  return useObserver(() => (
    <div className="homepage-sections">
      <Container className="homepage-sections-service-info">
        <Row>
          <Col md="12">
            {!store && !store.pagesData && store.pagesData.length === 0
              ? null
              : store.pagesStore.pagesData
                  .filter((item) => item.id === 9270)
                  .map((item) => {
                    return <div key={item.id} dangerouslySetInnerHTML={{ __html: item.content.rendered }} />;
                  })}
            <p>&nbsp;</p>
          </Col>
        </Row>
      </Container>
      {setLatestSermon(store)}
      <div>
        {footerContent.length === 0 ? null : (
          <iframe
            src={footerContent.length === 0 ? null : footerContent.acf.footer_map}
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Hill City Church Map"
          ></iframe>
        )}
      </div>
      {store.pagesStore.homePageData.length === 0 ? (
        <Spinner />
      ) : (
        store.pagesStore.homePageData.acf.homepage.map((item, index) => {
          const sectionStyles = {
            background: 'url(' + item.image + ')',
            backgroundColor: `${item.background_color}`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: `${item.text_color}`,
          };
          return (
            <div key={index} style={sectionStyles} className={item.image ? 'with-image' : 'with-content'}>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          );
        })
      )}
    </div>
  ));
}

export default HomepageSections;
