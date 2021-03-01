import React, { useState } from "react";

import PageHeader from "components/Headers/PageHeader.js"
import SpinnerFullPage from "components/Spinner/SpinnerFullPage"
import emailjs from 'emailjs-com';
import { Alert, Container } from "reactstrap";

function ConnectionSignup() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_stlh02s', 'template_fzarfqh', e.target, 'user_if8ZOwuPyLPg85M92qvCw')
      .then((result) => {
          console.log(result);
          setEmailSubmitted('success')
      }, (error) => {
          console.log(error);
          setEmailSubmitted('failed')
      });
      e.target.reset()
  }

  const setMessage = () => {
    if(emailSubmitted === 'success'){
      return <Alert color="success" isOpen={alert1}>
                <Container>
                  <div className="alert-icon">
                    <i className="now-ui-icons ui-2_like"></i>
                  </div>
                  <strong>Your message was sent.</strong> Thank you for contacting Hill City Church. Your message is important to us and one of our leadership servants will respond in a timely manner.
                  <button
                    type="button"
                    className="close"
                    onClick={() => setAlert1(false)}
                  >
                    <span aria-hidden="true">
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                    </span>
                  </button>
                </Container>
              </Alert>
    } else if(emailSubmitted === 'failed'){
      return <Alert color="danger" isOpen={alert2}>
              <Container>
                <div className="alert-icon">
                  <i className="now-ui-icons objects_support-17"></i>
                </div>
                <strong>Message submission failed.</strong> Something went wrong. please check the information and try again.
                <button
                  type="button"
                  className="close"
                  onClick={() => setAlert2(false)}
                >
                  <span aria-hidden="true">
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </span>
                </button>
              </Container>
            </Alert>
    }
  }
  
  const [aboutData, setAboutData] = useState([]);
  const [emailSubmitted, setEmailSubmitted] = useState('')
  const [alert1, setAlert1] = useState(true);
  const [alert2, setAlert2] = useState(true);

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
          : aboutData.filter((page) => page.id === 8848).map((page, index) => {
            return <div key={index}>
                    <PageHeader headerData={page}/>
                    <div className="page-content-title">
                      <h2 className="container">{page.title.rendered}</h2>
                      <hr className="page-content-hr" />
                    </div>
                    <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />
                    <div className="container">
                      { setMessage() }
                      <form onSubmit={sendEmail}>
                        <div className="form-group row">
                          <label htmlFor="name" className="col-2 col-form-label">Your Name</label> 
                          <div className="col-8">
                            <input id="name" name="connect-name" type="text" className="form-control" required="required"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-email" className="col-2 col-form-label">Email</label> 
                          <div className="col-8">
                            <input id="connect-email" name="connect-email" type="email" className="form-control" required="required"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-phone" className="col-2 col-form-label">Phone</label> 
                          <div className="col-8">
                            <input id="connect-phone" name="connect-phone" type="tel" className="form-control" required="required"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-street-address" className="col-2 col-form-label">Street Address</label> 
                          <div className="col-8">
                            <input id="connect-street-address" name="connect-street-address" type="text" className="form-control" required="required"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-city" className="col-2 col-form-label">City</label> 
                          <div className="col-8">
                            <input id="connect-city" name="connect-city" type="text" required="required" className="form-control"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-state" className="col-2 col-form-label">State</label> 
                          <div className="col-8">
                            <input id="connect-state" name="connect-state" type="text" className="form-control" required="required"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-zip-code" className="col-2 col-form-label">Zip Code</label> 
                          <div className="col-8">
                            <input id="connect-zip-code" name="connect-zip-code" type="text" className="form-control" required="required"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="connect-message" className="col-2 col-form-label">Share with us your thoughts how you feel would be best connected.</label> 
                          <div className="col-8">
                            <textarea id="connect-message" name="connect-message" cols="40" rows="5" className="form-control"></textarea>
                          </div>
                        </div> 
                        <div className="form-group row">
                          <div className="offset-4 col-8">
                            <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
            })
        }
      </div>
    </>
  );
}

export default ConnectionSignup;
