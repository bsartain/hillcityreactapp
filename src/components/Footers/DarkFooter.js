/*eslint-disable*/
import React, { useEffect, useState, useContext } from 'react';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { runInAction } from 'mobx';
import { getPagesData, getHomePageData, getSermonDataServiceTwo, getSermonPreacher, getSermonSeries, getSermonBibleBooks } from 'services/services';

function DarkFooter() {
  const store = useContext(StoreContext);
  const [footerContent, setfooterContent] = useState([]);

  useEffect(() => {
    async function pagesData() {
      const pagesDataResponse = await getPagesData();
      runInAction(() => {
        store.pagesStore.pagesData = pagesDataResponse;
      });
    }
    pagesData();

    async function homePageData() {
      const homepagePageDataResponse = await getHomePageData();
      runInAction(() => {
        store.pagesStore.homePageData = homepagePageDataResponse;
      });
    }
    homePageData();

    async function sermonDataTwo() {
      const sermonDataResponse = await getSermonDataServiceTwo('https://hillcitysc.com/wp-json/hc/v1/hc-sermons');
      runInAction(() => {
        store.sermonStore.sermonData = sermonDataResponse;
        store.sermonStore.sermonFilterData = sermonDataResponse;
      });
    }
    sermonDataTwo();

    async function preachers() {
      const sermonPreacherDataResponse = await getSermonPreacher();
      runInAction(() => {
        store.sermonStore.sermonPreacher = sermonPreacherDataResponse;
      });
    }
    preachers();

    async function sermonSeries() {
      const sermonSeriesDataResponse = await getSermonSeries();
      runInAction(() => {
        store.sermonStore.sermonSeries = sermonSeriesDataResponse;
      });
    }
    sermonSeries();

    async function bibleBooks() {
      const sermonBibleBooksDataResponse = await getSermonBibleBooks();
      runInAction(() => {
        store.sermonStore.sermonBibleBooks = sermonBibleBooksDataResponse;
      });
    }
    bibleBooks();

    async function specialAnnouncement() {
      fetch('https://hillcitysc.com/wp-json/acf/v3/posts/8857')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          runInAction(() => {
            store.pagesStore.orderOfServiceData = data;
          });
        });
    }
    specialAnnouncement();

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

  return useObserver(() => (
    <div className="dark-footer-main">
      <div className="dark-footer-container">
        <div className="dark-footer-content">
          {footerContent.length === 0 ? null : (
            <div
              dangerouslySetInnerHTML={{
                __html: footerContent.acf.footer_content,
              }}
            />
          )}
        </div>
        <div className="dark-footer-map">
          <h2>Map</h2>
          <div>
            {footerContent.length === 0 ? null : (
              <iframe src={footerContent.length === 0 ? null : footerContent.acf.footer_map} width="100%" frameBorder="0" style={{ border: 0 }} allowFullScreen=""></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
}

export default DarkFooter;
