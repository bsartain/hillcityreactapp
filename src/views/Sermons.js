import React, { useState, useEffect, useContext } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { SermonContent } from 'views/SermonContent'
import { Pagination } from 'views/Pagination'
import SermonFilter from 'views/index-sections/SermonFilter'

import { useObserver } from 'mobx-react'
import { StoreContext } from 'index'
import { runInAction } from 'mobx'

function Sermons() {

  const store = useContext(StoreContext);

  const [loading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(12)

  useEffect(() => {

    async function getSermonPageData(){
      const sermonPageDataResponse = await store.getSermonData('https://hillcitysc.com//wp-json/wp/v2/wpfc_sermon?per_page=100')
      const sermonPageData = await sermonPageDataResponse 
      runInAction(() => {
        store.sermonData = sermonPageData
      });
    }
    getSermonPageData()

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
    
  }, [store]);
  
  let currentSermons

  if(store && store.sermonData && store.sermonData.length > 0){
    const indexOfLastSermon = currentPage * postsPerPage;
    const indexOfFirstSermon = indexOfLastSermon - postsPerPage;
    currentSermons = store.sermonData.slice(indexOfFirstSermon, indexOfLastSermon)
  }

  const paginate = (number) => setCurrentPage(number)

  return useObserver(() => (
    <>
      {!store || !store.sermonData || store.sermonData.length === 0
        ? <SpinnerFullPage/>
        : null
      }
      <div className="wrapper page-content-container">
        <>
          <div>
              {store.sermonData.length > 0
                ? <>
                  <PageHeader headerData={null} sermonHeaderData={store.sermonData[0]}/>  
                </>
                : null
              }              
              <div className="page-content-title">
                <h2 className="container">Current Sermons</h2>
                <hr className="page-content-hr" />
                <SermonFilter />
                {store.sermonData.length === 0
                  ? <h4>There are currently no results for this search</h4>
                  : null
                }
              </div>
          </div>
          {store.sermonData.length > 0
            ? <>
              <SermonContent sermonData={currentSermons} loading={loading}/>
              <div className="container">
                <Pagination sermonsPerPage={postsPerPage} totalSermons={store.sermonData.length} paginate={paginate}/>
              </div>
            </>
            : null
          }
        </> 
      </div>
    </>
  ))
}

export default Sermons;
