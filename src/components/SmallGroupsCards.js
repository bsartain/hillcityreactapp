import React, { useContext, useEffect } from 'react';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsTrackPage } from 'utils/utils';
import { runInAction } from 'mobx';

function SmallGroupsCards() {
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

  const formatDate = (date) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toDateString();
    return formattedDate;
  };

  const openLatestSermon = (page, e) => {
    e.preventDefault();
    runInAction(() => {
      store.sermonStore.singleSermonData = page;
      store.pagesStore.mediaPlayerIsDisplayed = true;
      store.pagesStore.isPlaying = true;
    });
  };

  const setQuestionCard = (page) => {
    if (page.small_group_questions) {
      return (
        <div className="card">
          <img src={page.featured_image.large} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{page.title}</h5>
            <p className="card-subtitle mb-2 text-muted">
              <small>{formatDate(page.date)}</small>
            </p>
            <a href={page.small_group_questions} className="card-link" target="_blank" rel="noreferrer">
              <i className="fas fa-file-pdf"></i>
            </a>
            <i className="fas fa-microphone" onClick={(e) => openLatestSermon(page, e)}></i>
          </div>
        </div>
      );
    }
  };

  return useObserver(() => (
    <>
      <div className="container small-group-cards">
        <div className="row">
          {store.pagesStore.pagesData.length === 0
            ? null
            : store.sermonStore.sermonData.map((page, index) => {
                return (
                  <div key={index} className="col-md-4">
                    {setQuestionCard(page)}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  ));
}

export default SmallGroupsCards;
