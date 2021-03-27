import React, { useState, useRef, useEffect, useContext } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { OrderOfService } from "views/OrderOfService";
import { nextSundaysDate } from "utils/utils";
import ReactToPrint from "react-to-print";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import { runInAction } from "mobx";

function LiveStream() {
  const ref = useRef(true);

  const store = useContext(StoreContext);

  const [sundayDate, setSundayDate] = useState("");
  const [printLogo, setPrintLogo] = useState(false);

  useEffect(() => {
    async function getOrderOfService() {
      const orderOfServiceDataResponse = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/8857");
      const orderOfServiceData = await orderOfServiceDataResponse;
      const { acf } = orderOfServiceData;
      runInAction(() => {
        store.orderOfServiceData = [acf];
      });
    }
    getOrderOfService();

    async function getSundaysDate() {
      const thisSundaysDate = await nextSundaysDate();
      setSundayDate(thisSundaysDate);
    }
    getSundaysDate();

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
      ref.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container live-stream-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 8857)
            .map((page, index) => {
              return (
                <div key={index}>
                  <PageHeader headerData={page} />
                  <div className="page-content-title container">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                    <h3>WELCOME! OUR SERVICE WILL BEGIN AT 10:00 AM ON {sundayDate}</h3>
                  </div>
                  <div className="container live-stream-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                  <div className="container react-print-container">
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn btn-primary">
                          <i className="now-ui-icons files_paper"></i> Print Order Of Service
                        </button>
                      )}
                      content={() => ref.current}
                      onBeforeGetContent={() => setPrintLogo(true)}
                      onAfterPrint={() => setPrintLogo(false)}
                      pageStyle={pageStyle}
                    />
                    {store.pagesStore.orderOfServiceData.length === 0 ? null : <OrderOfService ref={ref} printLogo={printLogo} />}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default LiveStream;
