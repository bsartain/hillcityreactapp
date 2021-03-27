import React, { useState, useContext, useEffect } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage";
import emailjs from "emailjs-com";
import { Alert, Container } from "reactstrap";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";

function Contact() {
  const [emailSubmitted, setEmailSubmitted] = useState("");
  const [alert1, setAlert1] = useState(true);
  const [alert2, setAlert2] = useState(true);
  const [footerContent, setfooterContent] = useState([]);

  const store = useContext(StoreContext);

  useEffect(() => {
    async function getFooterContent() {
      fetch("https://hillcitysc.com/wp-json/acf/v3/posts/9262")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setfooterContent(data);
        });
    }
    getFooterContent();
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_stlh02s", "template_c9wem4a", e.target, "user_if8ZOwuPyLPg85M92qvCw").then(
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
            <strong>Your message was sent.</strong> Thank you for contacting Hill City Church. Your message is important to us and one of our leadership servants will respond in a timely manner.
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
            .filter((page) => page.id === 41)
            .map((page, index) => {
              return (
                <div key={index}>
                  <PageHeader headerData={page} />
                  <div className="page-content-title">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  {/* <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />; */}
                  <div className="container" style={{ marginBottom: "50px" }}>
                    {setMessage()}
                    <form onSubmit={sendEmail} className="container">
                      <p>If you need prayer or would like to learn more about Hill City and how we can serve you please fill out the form and someone will contact you shortly.</p>
                      <div className="form-group row">
                        <label htmlFor="name" className="col-2 col-form-label">
                          Name
                        </label>
                        <div className="col-8">
                          <input id="name" name="name" type="text" className="form-control" required="required" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="email" className="col-2 col-form-label">
                          Email
                        </label>
                        <div className="col-8">
                          <input id="email" name="email" type="email" className="form-control" required="required" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="subject" className="col-2 col-form-label">
                          Subject
                        </label>
                        <div className="col-8">
                          <input id="subject" name="subject" type="text" className="form-control" required="required" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="message" className="col-2 col-form-label">
                          Message
                        </label>
                        <div className="col-8">
                          <textarea id="message" name="message" cols="40" rows="5" className="form-control" required="required"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-12">
                          <button name="submit" type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              );
            })
        )}
      </div>
      <div className="service-times-container">
        <div className="service-times">
          {footerContent.length === 0 ? null : (
            <div
              dangerouslySetInnerHTML={{
                __html: footerContent.acf.footer_content,
              }}
            />
          )}
        </div>
        {footerContent.length === 0 ? null : (
          <iframe
            src={footerContent.length === 0 ? null : footerContent.acf.footer_map}
            width="100%"
            height="600px"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            title="Hill City Church Map"
          ></iframe>
        )}
      </div>
    </>
  ));
}

export default Contact;
