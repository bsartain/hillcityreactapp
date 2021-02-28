import React, { useState, useRef, useEffect } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage"
import { OrderOfService } from "views/OrderOfService";
import { nextSundaysDate } from "utils/utils";
import ReactToPrint from 'react-to-print';

function LiveStream() {
  
  const [liveStreamData, setLiveStreamData] = useState([])
  const [acfData, setAcfData] = useState([])
  const [sundayDate, setSundayDate] = useState('')
  const [printLogo, setPrintLogo] = useState(false)

  const ref = useRef();

  useEffect(() => {

    async function fetchPageData() {
      const response = await fetch('https://hillcitysc.com/wp-json/wp/v2/pages?per_page=30')
      const myData = await response.json()
      setLiveStreamData(myData)
    }
    fetchPageData()

    async function fetchLiveStreamData(){
      const response = await fetch('https://hillcitysc.com/wp-json/acf/v3/posts/8857')
      const myData = await response.json()
      setAcfData([myData.acf])

    }
    fetchLiveStreamData()

    async function getSundaysDate(){
      const thisSundaysDate = await nextSundaysDate()
      setSundayDate(thisSundaysDate)
    }
    getSundaysDate()

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

  const pageStyle = `
  @page {
    size: 80mm 50mm;
  }
  @media all {
    .pagebreak {
      display: none;
    }
  }
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

  return (
    <>
      <div className="wrapper page-content-container live-stream-container">
        {liveStreamData.length === 0
          ? <SpinnerFullPage/>
          : liveStreamData.filter((page) => page.id === 8857).map((page, index) => {
            return <div key={index}>
                    <PageHeader headerData={page}/>
                    <div className="page-content-title">
                      <h2 className="container">{page.title.rendered}</h2>
                      <hr className="page-content-hr" />
                      <h3>WELCOME! OUR SERVICE WILL BEGIN AT 10:00 AM ON { sundayDate }</h3>
                    </div>
                    <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />
                    <div className="container">
                      <ReactToPrint
                        trigger={() => <button className="btn btn-primary">
                                            <i className="now-ui-icons files_paper"></i> Print Order Of Service
                                        </button>
                        }
                        content={() => ref.current}
                        onBeforeGetContent={() => setPrintLogo(true)}
                        onAfterPrint={() => setPrintLogo(false)}
                        pageStyle={pageStyle}
                      />
                      {acfData.length === 0
                        ? null
                        : <OrderOfService acfData={acfData} ref={ref} printLogo={printLogo}/>
                      }
                    </div>
                  </div>
            })
        }
      </div>
    </>
  );
}

export default LiveStream;
