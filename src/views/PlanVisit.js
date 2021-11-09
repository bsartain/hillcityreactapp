import React, { useContext, useEffect, useState } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import { RefTagger } from "react-reftagger";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import { useHistory } from "react-router-dom";
import { googleAnalyticsTrackPage } from "utils/utils";
import Meta from "components/Meta";
import { Modal, Button, ModalBody, Alert, Container } from "reactstrap";
import emailjs from "emailjs-com";

function PlanVisit() {
  const store = useContext(StoreContext);
  const history = useHistory();
  const [modal1, setModal1] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState("");
  const [alert1, setAlert1] = useState(true);
  const [alert2, setAlert2] = useState(true);

  useEffect(() => {
    googleAnalyticsTrackPage(history.location.pathname);

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [history.location.pathname]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_stlh02s", "template_tv7s5ss", e.target, "user_if8ZOwuPyLPg85M92qvCw").then(
      (result) => {
        console.log(result);
        setEmailSubmitted("success");
      },
      (error) => {
        console.log(error);
        setEmailSubmitted("failed");
      }
    );
    e.target.reset();
  };

  const setMessage = () => {
    if (emailSubmitted === "success") {
      return (
        <Alert color="success" isOpen={alert1}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons ui-2_like"></i>
            </div>
            <strong>Thank you for planning your visit at Hill City Church!</strong> We look forward to seeing you. If you have any questions in the mean time please reach out via text or phone to
            (863)899-3125. God bless!
            <button type="button" className="close" onClick={() => setAlert1(false)}>
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
      );
    } else if (emailSubmitted === "failed") {
      return (
        <Alert color="danger" isOpen={alert2}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Message submission failed.</strong> Something went wrong. please check the information and try again.
            <button type="button" className="close" onClick={() => setAlert2(false)}>
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
      );
    }
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 9892)
            .map((page, index) => {
              return (
                <div key={index}>
                  <Meta title={page.title.rendered} description={page.content.rendered} image={page.better_featured_image.source_url} url={window.location.href} />
                  <RefTagger />
                  <PageHeader headerData={page} />
                  <div className="page-content-title">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  <div className="container plan-visit-top">
                    <div>
                      <h3>Let's Get to Know Eachother</h3>
                      <p>
                        We know meeting someone for the first time can be intimidating, and going to a new church for the first time can be nerve-racking. We want to help make your first experience at
                        Hill City Church a great one!
                      </p>
                      <button className="btn btn-primary" onClick={() => setModal1(true)}>
                        PLAN YOUR VISIT
                      </button>
                    </div>
                    <div>
                      <img src="https://hillcitysc.com/wp-content/uploads/2020/07/kirk.jpg" className="img-fluid" alt="Hill City Church" />
                    </div>
                  </div>
                  <div className="plan-visit-map">
                    {/* <div className="plan-visit-overlay"></div> */}
                    <div className="plan-visit-map-content">
                      <h2>SERVICE TIMES</h2>
                      <p>Hill City Church meets every Sunday @ 10:00 am In the beautiful classic courtroom in the Getty’s Art Center. The address is 201 E Main St, Rock Hill, SC 29730.</p>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3148.8901437517507!2d-81.02717659923928!3d34.92518611809152!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x64f7a6109e565477!2sTom%20S.%20Gettys%20Art%20Center!5e0!3m2!1sen!2sus!4v1635789997999!5m2!1sen!2sus"
                        height="350"
                        loading="lazy"
                        title="Hill City Church"
                        style={{ maxWidth: "600px", width: "100%", border: 0 }}
                      ></iframe>
                      <button className="btn btn-primary" onClick={() => setModal1(true)}>
                        PLAN YOUR VISIT
                      </button>
                    </div>
                  </div>
                  <div className="plan-visit-what-to-expect-title-container">
                    <h1 className="plan-visit-what-to-expect-title">WHAT TO EXPECT</h1>
                    <div className="plan-visit-what-to-expect-border"></div>
                  </div>
                  <div className="container plan-visit-top">
                    <div>
                      <img src="https://hillcitysc.com/wp-content/uploads/2018/07/IMG_0993-e1532289630237.jpg" className="img-fluid" alt="Hill City Church" />
                    </div>
                    <div>
                      <h3>HOW LONG IS A SERVICE AT HILL CITY CHURCH?</h3>
                      <p>
                        In total, A Hill City Church service is about 90 minutes in length. Services begin with a folk/rock style of music (Usually an acoustic guitar, banjo, and piano. It’s really
                        cool!) leading the church in song. Our song lyrics and order of service are always laid out on our live stream page here so you can easily follow along on your mobile device.
                        There’s a “Print Order of Service button” on that page as well if you prefer a paper version. After the music portion of the service is complete, one of our elders will share a
                        truthful and encouraging message about Jesus straight from the bible that is easy to understand and learn.
                      </p>
                      <button className="btn btn-primary" onClick={() => setModal1(true)}>
                        PLAN YOUR VISIT
                      </button>
                    </div>
                  </div>
                  <div className="container plan-visit-top">
                    <div>
                      <img src="https://hillcitysc.com/wp-content/uploads/2018/07/IMG_0989.jpg" className="img-fluid" alt="Hill City Church" />
                    </div>
                    <div>
                      <h3>WHAT IS THE CULTURE LIKE AT HILL CITY CHURCH?</h3>
                      <p>Sunday's at Hill City are casual, inviting and a family friendly atmosphere. Come as you are and be our honored guest!</p>
                      <button className="btn btn-primary" onClick={() => setModal1(true)}>
                        PLAN YOUR VISIT
                      </button>
                    </div>
                  </div>
                  <div className="container plan-visit-top">
                    <div>
                      <img src="https://hillcitysc.com/wp-content/uploads/2018/07/IMG_0921.jpg" className="img-fluid" alt="Hill City Church" />
                    </div>
                    <div>
                      <h3>WHAT ABOUT MY KIDS?</h3>
                      <p>
                        We greatly value kids at Hill City Church and make them a priority. Because we’re a small church and growing, the Elders and deacons are in the process of implementing a robust
                        ministry for the kids which will include a safe, detailed check-in process, volunteer background checks, and an overall great experience for the kids to know Jesus. In the
                        meantime, we have a short children’s sermon during our service that includes a wonderful reading from the “Jesus Story Book Bible” by Sally Lloyd Jones. Most of the feedback we
                        get is that adults love it too!
                      </p>
                      <button className="btn btn-primary" onClick={() => setModal1(true)}>
                        PLAN YOUR VISIT
                      </button>
                    </div>
                  </div>
                  <div className="plan-visit-form">
                    {setMessage()}
                    <form onSubmit={sendEmail}>
                      <h3>PLAN YOUR VISIT</h3>
                      <div className="form-group">
                        <label>First & Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" />
                        <small id="emailHelp" className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="start">What date are you planning on visiting us:</label>
                        <input className="form-control" type="date"></input>
                      </div>
                      <div className="form-check form-group">
                        <p>Do you have kids between the ages of 12 months and 5 years?</p>
                        <input className="form-check-input" type="radio" name="kidsRadios" id="kidsRadios1" value="option1" />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check form-group">
                        <input className="form-check-input" type="radio" name="kidsRadios" id="kidsRadios2" value="option2" />
                        <label className="form-check-label">No</label>
                      </div>
                      <div className="form-check form-group">
                        <p>Would you like one of our pastors to reach out to you directly?</p>
                        <input className="form-check-input" type="radio" name="contactRadios" id="contactRadios3" value="option3" />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check form-group">
                        <input className="form-check-input" type="radio" name="contactRadios" id="contactRadios4" value="option4" />
                        <label className="form-check-label">No</label>
                      </div>
                      <div className="form-group form-group-button">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="container plan-visit-top">
                    <span>
                      <i>
                        When I came to Hill City I didn't know what to expect. What I found was a family that did life together centered around a relationship with Jesus. I am thankful for this
                        church!
                      </i>
                      <strong> - Brett Sartain</strong>
                    </span>
                  </div>
                  <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                    <div className="modal-header justify-content-center">
                      <button className="close" type="button" onClick={() => setModal1(false)}>
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                      </button>
                      <h4 className="title title-up">PLAN YOUR VISIT</h4>
                    </div>
                    <ModalBody>
                      <div className="plan-visit-form" style={{ padding: 0 }}>
                        {setMessage()}
                        <form>
                          <div className="form-group">
                            <label>First & Last Name</label>
                            <input id="name" name="name" type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input id="email" name="email" type="email" className="form-control" />
                            <small id="emailHelp" className="form-text text-muted">
                              We'll never share your email with anyone else.
                            </small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="start">What date are you planning on visiting us:</label>
                            <input id="date" name="date" className="form-control" type="date"></input>
                          </div>
                          <div className="form-check form-group">
                            <p>Do you have kids between the ages of 12 months and 5 years?</p>
                            <input id="kidsYes" name="kidsYes" className="form-check-input" type="radio" value="option1" />
                            <label className="form-check-label">Yes</label>
                          </div>
                          <div className="form-check form-group">
                            <input id="kidsNo" name="kidsNo" className="form-check-input" type="radio" value="option2" />
                            <label className="form-check-label">No</label>
                          </div>
                          <div className="form-check form-group">
                            <p>Would you like one of our pastors to reach out to you directly?</p>
                            <input id="reachYes" name="reachYes" className="form-check-input" type="radio" value="option3" />
                            <label className="form-check-label">Yes</label>
                          </div>
                          <div className="form-check form-group">
                            <input id="reachNo" name="reachNo" className="form-check-input" type="radio" value="option4" />
                            <label className="form-check-label">No</label>
                          </div>
                          <div className="form-group form-group-button">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </ModalBody>
                    <div className="modal-footer">
                      <Button color="danger" type="button" onClick={() => setModal1(false)}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default PlanVisit;
