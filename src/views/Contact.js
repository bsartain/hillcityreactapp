import React, { useState } from "react";

import PageHeader from "components/Headers/PageHeader.js";
import SpinnerFullPage from "components/Spinner/SpinnerFullPage"
import emailjs from 'emailjs-com';
import { Alert, Container } from "reactstrap";

function Faith() {
  
  const [aboutData, setAboutData] = useState([])
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_stlh02s', 'template_c9wem4a', e.target, 'user_if8ZOwuPyLPg85M92qvCw')
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

  return (
    <>
      <div className="wrapper page-content-container">
        {aboutData.length === 0
          ? <SpinnerFullPage/>
          : aboutData.filter((page) => page.id === 41).map((page, index) => {
              return <div key={index}>
                      <PageHeader headerData={page}/>
                      <div className="page-content-title">
                        <h2 className="container">{page.title.rendered}</h2>
                        <hr className="page-content-hr" />
                      </div>
                      {/* <div className="container" dangerouslySetInnerHTML={{__html: page.content.rendered}} />; */}
                      <div className="container" style={{marginBottom: '50px'}}>
                      { setMessage() }                 
                      <form onSubmit={sendEmail} className="container">
                          <div className="form-group row">
                            <label htmlFor="name" className="col-2 col-form-label">Name</label> 
                            <div className="col-8">
                              <input id="name" name="name" type="text" className="form-control" required="required"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="email" className="col-2 col-form-label">Email</label> 
                            <div className="col-8">
                              <input id="email" name="email" type="email" className="form-control" required="required"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="subject" className="col-2 col-form-label">Subject</label> 
                            <div className="col-8">
                              <input id="subject" name="subject" type="text" className="form-control" required="required"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="message" className="col-2 col-form-label">Message</label> 
                            <div className="col-8">
                              <textarea id="message" name="message" cols="40" rows="5" className="form-control" required="required"></textarea>
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

export default Faith;
