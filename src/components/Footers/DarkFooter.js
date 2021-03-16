/*eslint-disable*/
import React, { useEffect, useState, useContext } from "react";

import { useObserver } from 'mobx-react'
import { StoreContext } from 'index'
import { runInAction } from "mobx";
import { 
  getPagesData,
  getHomePageData,
  getSermonDataService,
  getSermonPreacher,
  getSermonSeries,
  getSermonBibleBooks
} from 'services/services'
 
function DarkFooter() {
  
  const store = useContext(StoreContext);
  const [footerContent, setfooterContent] = useState([])

  useEffect(() => {



    async function pagesData(){
      const pagesDataResponse = await getPagesData()
      runInAction(() => {
        store.pagesData = pagesDataResponse
      });
    }
    pagesData()

    async function homePageData(){
      const homepagePageDataResponse = await getHomePageData()
        runInAction(() => {
          store.homePageData = homepagePageDataResponse
        });
    }
    homePageData()

    async function sermonData(){
      const sermonDataResponse = await getSermonDataService('https://hillcitysc.com//wp-json/wp/v2/wpfc_sermon?per_page=100')
        runInAction(() => {
          store.sermonData = sermonDataResponse
        });
    }
    sermonData()

    async function preachers(){
      const sermonPreacherDataResponse = await getSermonPreacher()
        runInAction(() => {
          store.sermonPreacher = sermonPreacherDataResponse
        });
    }
    preachers()

    async function sermonSeries(){
      const sermonSeriesDataResponse = await getSermonSeries()
        runInAction(() => {
          store.sermonSeries = sermonSeriesDataResponse
        });
    }
    sermonSeries()

    async function bibleBooks(){
      const sermonBibleBooksDataResponse = await getSermonBibleBooks()
        runInAction(() => {
          store.sermonBibleBooks = sermonBibleBooksDataResponse
        });
    }
    bibleBooks()

    async function specialAnnouncement(){
      fetch('https://hillcitysc.com/wp-json/acf/v3/posts/8857').then(res => {
        return res.json()
      }).then(data => {
        runInAction(() => {
          store.orderOfServiceData = data
        });
      })
    }
    specialAnnouncement()

    async function getFooterContent(){
      fetch('https://hillcitysc.com/wp-json/acf/v3/posts/9262').then(res => {
        return res.json()
      }).then(data => {
        setfooterContent(data)
      })
    }
    getFooterContent()

  }, [])

  return useObserver(() => (
    <div className="dark-footer-main">
      <div className="dark-footer-container">
          <div className="dark-footer-content">
            { console.log('FOOTER CONTENT: ', footerContent) }
            {footerContent.length === 0
              ? null 
              : <div dangerouslySetInnerHTML={{__html: footerContent.acf.footer_content }}/>
            }
          </div>
          <div className="dark-footer-map">
            <h2>Map</h2>
            <div>
              {footerContent.length === 0
                ? null 
                : <iframe src={footerContent.length === 0 ? null : footerContent.acf.footer_map} width="100%" frameBorder="0" style={{border:0}} allowFullScreen=""></iframe>
              }
            </div>
          </div>
      </div>
    </div>
  ))
}

export default DarkFooter;
