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

  }, [])

  return useObserver(() => (
    <div className="dark-footer-main">
      <div className="dark-footer-container">
          <div className="dark-footer-content">
            <h2>Gatherings</h2>
            <div>
              <h4>Sunday Mornings:</h4>
              Worship: 10:00am<br/>
              <h4>Address:</h4>
              Gettys Art Center<br/>
              201 E Main St<br/>
              Rock Hill, SC 29730<br/>
              Come join us. We provide a nursery for up to age three. May God richly bless you in Jesus Christ.
            </div>
          </div>
          <div className="dark-footer-map">
            <h2>Map</h2>
            <div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13085.04118540747!2d-81.0257474!3d34.9250083!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x800d7d1e783ba75f!2sHill+City+Church!5e0!3m2!1sen!2sus!4v1532547083662" width="100%" frameBorder="0" style={{border:0}} allowFullScreen=""></iframe>
            </div>
          </div>
      </div>
    </div>
  ))
}

export default DarkFooter;
