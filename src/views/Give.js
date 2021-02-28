import React, { useState } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import DonationForm from "views/DonationForm"

function Give() {
  
  const [giveData, setGiveData] = useState([]);

  React.useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://hillcitysc.com/wp-json/wp/v2/pages?per_page=30')
      const myData = await response.json()
      setGiveData(myData)
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
        {giveData.length === 0
          ? <SpinnerFullPage/>
          : giveData.filter((page) => page.id === 9135).map((page, index) => {
            return <div key={index}>
                    <PageHeader headerData={page}/>
                    <div className="page-content-title">
                      <h2 className="container">{page.title.rendered}</h2>
                      <hr className="page-content-hr" />
                    </div>
                    <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />;
                    <DonationForm/>
                  </div>
            })
        }
      </div>
    </>
  );
}

export default Give;
