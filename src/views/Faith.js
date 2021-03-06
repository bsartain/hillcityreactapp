import React, { useState } from "react";

import PageHeader from "components/Headers/PageHeader.js"
import SpinnerFullPage from "components/Spinner/SpinnerFullPage"

function Faith() {
  
  const [aboutData, setAboutData] = useState([]);

  React.useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://hillcitysc.com/wp-json/wp/v2/pages?per_page=30')
      const myData = await response.json()
      setAboutData(myData)
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
  return (
    <>
      <div className="wrapper page-content-container">
        {aboutData.length === 0
          ? <SpinnerFullPage/>
          : aboutData.filter((page) => page.id === 7674).map((page, index) => {
                return <div key={index}>
                        <PageHeader headerData={page}/>
                        <div className="page-content-title">
                          <h2 className="container">{page.title.rendered}</h2>
                          <hr className="page-content-hr" />
                        </div>
                        <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />;
                      </div>
          })
        }
      </div>
    </>
  );
}

export default Faith;
