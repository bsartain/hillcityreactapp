import React, { useState } from "react";

import IndexHeader from "components/Headers/IndexHeader.js";
import HomePageSection from './index-sections/HomepageSections';

function Index() {
  
  const [headerData, setHeaderData] = useState([]);

  React.useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://hillcitysc.com/wp-json/acf/v3/posts/86')
      const myData = await response.json()
      setHeaderData(myData.acf)
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
      <div className="wrapper">
        <IndexHeader headerData={headerData}/>
        <HomePageSection/>
      </div>
    </>
  );
}

export default Index;
