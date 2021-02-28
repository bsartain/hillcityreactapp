import React, { useState, useEffect } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { SermonContent } from 'views/SermonContent'
import { Pagination } from 'views/Pagination'

function Sermons() {
  
  const [sermonData, setSermonData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(12)



  useEffect(() => {

    async function fetchData() {
      setLoading(true)
      const response = await fetch('https://hillcitysc.com//wp-json/wp/v2/wpfc_sermon?per_page=100')
      const myData = await response.json()
      setSermonData(myData)
      setLoading(false)
    }
    fetchData()

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
    
  }, []);

  const indexOfLastSermon = currentPage * postsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - postsPerPage;
  const currentSermons = sermonData.slice(indexOfFirstSermon, indexOfLastSermon)

  const paginate = (number) => setCurrentPage(number)

  return (
    <>
      <div className="wrapper page-content-container">
        {sermonData.length === 0
          ? <SpinnerFullPage/>
          : <div>
                <PageHeader headerData={null} sermonHeaderData={sermonData[0]}/>
                <div className="page-content-title">
                  <h2 className="container">Current Sermons</h2>
                  <hr className="page-content-hr" />
                </div>
                {/* <div className="container" dangerouslySetInnerHTML={{__html: '<h2>Hello World</h2>' }} />; */}
            </div>
        }
        {/* {sermonData.length === 0
          ? <SpinnerFullPage/>
          : sermonData.filter((page) => page.id === 12).map((page, index) => {
            return <div key={index}>
            <PageHeader headerData={page}/>
            <div className="page-content-title">
            <h2 className="container">{page.title.rendered}</h2>
            <hr className="page-content-hr" />
            </div>
            <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />;
            </div>
          })
        } */}
        <SermonContent sermonData={currentSermons} loading={loading}/>
        <div className="container">
          <Pagination sermonsPerPage={postsPerPage} totalSermons={sermonData.length} paginate={paginate}/>
        </div>
      </div>
    </>
  );
}

export default Sermons;
