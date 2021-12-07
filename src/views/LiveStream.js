import React, { useState, useRef, useEffect, useContext } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { OrderOfService } from "views/OrderOfService";
import { nextSundaysDate } from "utils/utils";
import ReactToPrint from "react-to-print";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import { runInAction } from "mobx";
import { useHistory } from "react-router-dom";
import { googleAnalyticsTrackPage } from "utils/utils";
import ReactGA from "react-ga";
import Meta from "components/Meta";
import { Modal, ModalBody, Spinner } from "reactstrap";

function LiveStream() {
  const ref = useRef(true);
  const history = useHistory();

  const store = useContext(StoreContext);

  const [sundayDate, setSundayDate] = useState("");
  const [printLogo, setPrintLogo] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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

    googleAnalyticsTrackPage(history.location.pathname);

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
  }, [history.location.pathname]);

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
    .scripture-reading-container p{
      font-size: 25px;
    }
    .show-announcements span{
      font-size: 25px;
    }
    .content-order-service p{
      font-size: 25px;
    }
    .print-order-service{
      margin-left: 25px
    }
    .order-service-hr{
      margin: 50px 50px;
    }
  }
`;

  const gaClickPrintBulletin = () => {
    ReactGA.event({
      category: "Live Stream Page",
      action: "User clicked button to print order of service",
    });
  };

  const gaClickYoutube = () => {
    ReactGA.event({
      category: "Live Stream Page",
      action: "User clicked watch live on YouTube",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName || lastName || email || phone) {
      setShowSpinner(true);
      const url = "https://hillcitysc.com/wp-json/contact-form-7/v1/contact-forms/10066/feedback";
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "text-40": firstName,
          "text-165": lastName,
          "email-732": email,
          "tel-778": phone,
        }),
      })
        .then(function (res) {
          console.log("Success: ", res);
          if (res.status === 200) {
            setAlert(true);
            setAlertMessage("Thank you for connecting with us. One of our team members will be in touch in the next few days. God Bless");
            setAlertType("alert-success");
            setShowSpinner(false);
          } else if (res.status === 404) {
            setAlert(true);
            setAlertMessage("Oops! Something went wrong. Please try again");
            setAlertType("alert-danger");
            setShowSpinner(false);
          }
        })
        .catch(function (res) {
          console.log("Error: ", res);
        });
    }
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container live-stream-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 8857)
            .map((page, index) => {
              const youtubeLink = page.acf.youtube_link;
              const parsedLink = youtubeLink.substring(17);
              return (
                <div key={index}>
                  <Meta title={page.title.rendered} description={page.content.rendered} image={page.better_featured_image.source_url} url={window.location.href} />
                  <PageHeader headerData={page} />
                  <div className="page-content-title container">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                    <h3>WELCOME! OUR SERVICE WILL BEGIN AT 10:00 AM ON {sundayDate}</h3>
                  </div>
                  <div className="container live-stream-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                  <div className="youtube">
                    {page.acf.youtube_link ? (
                      <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${parsedLink}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : null}
                  </div>
                  <div className="container react-print-container">
                    <div className="media-buttons-container">
                      {page.acf.youtube_link ? (
                        <a
                          className="btn btn-primary youtube-btn media-button"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.youtube.com/watch?v=${parsedLink}`}
                          onClick={() => gaClickYoutube()}
                        >
                          <i className="fab fa-youtube"></i> Watch On YouTube
                        </a>
                      ) : null}
                      <ReactToPrint
                        trigger={() => (
                          <button className="btn btn-primary media-button">
                            <i className="fas fa-print"></i> Print Order Of Service
                          </button>
                        )}
                        content={() => ref.current}
                        onBeforeGetContent={() => {
                          setPrintLogo(true);
                          gaClickPrintBulletin();
                        }}
                        onAfterPrint={() => setPrintLogo(false)}
                        pageStyle={pageStyle}
                      />
                      <button onClick={() => setConnectModal(true)} className="btn btn-primary connect-card-btn media-button" rel="noopener noreferrer">
                        <i className="fas fa-address-card"></i> Connect Card
                      </button>
                      <div>
                        <Modal isOpen={connectModal} toggle={() => setConnectModal(false)}>
                          <div className="modal-header justify-content-center">
                            <button
                              className="close"
                              type="button"
                              onClick={() => {
                                setConnectModal(false);
                                setAlert(false);
                              }}
                            >
                              <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                            <h4 className="title title-up">LET'S GET TO KNOW EACHOTHER</h4>
                          </div>
                          <ModalBody>
                            <div className="plan-visit-form" style={{ padding: 0 }}>
                              <p>Thanks for connecting with us today. Our team will pray for you and help you with next steps in becoming a part of the Hill City family.</p>
                            </div>
                            {showSpinner ? <Spinner /> : null}
                            {alert ? (
                              <div className={`alert ${alertType}`} role="alert">
                                {alertMessage}
                              </div>
                            ) : null}
                            <form onSubmit={(e) => handleSubmit(e)}>
                              <div className="form-group">
                                <label htmlFor="connectFirstName">First Name (Required)</label>
                                <input type="text" className="form-control" id="connectFirstName" required onChange={(e) => setFirstName(e.target.value)} onFocus={() => setAlert(false)} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="connectLastName">Last Name</label>
                                <input type="text" className="form-control" id="connectLastName" onChange={(e) => setLastName(e.target.value)} onFocus={() => setAlert(false)} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="connectEmail">Email (Required)</label>
                                <input type="email" className="form-control" id="connectEmail" required onChange={(e) => setEmail(e.target.value)} onFocus={() => setAlert(false)} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="connectPhone">Phone</label>
                                <input type="tel" className="form-control" id="connectPhone" onChange={(e) => setPhone(e.target.value)} onFocus={() => setAlert(false)} />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </ModalBody>
                        </Modal>
                      </div>
                    </div>
                    {store.pagesStore.orderOfServiceData.length === 0 ? <SpinnerFullPage /> : <OrderOfService ref={ref} printLogo={printLogo} />}
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
