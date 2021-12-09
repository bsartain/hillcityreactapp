import React, { useState } from 'react';
import { Modal, ModalBody, Spinner } from 'reactstrap';
import emailjs from 'emailjs-com';

const ConnectCard = () => {
  const [connectModal, setConnectModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alert, setAlert] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSpinner(true);
    emailjs.sendForm('service_stlh02s', 'template_lsx5j2r', e.target, 'user_if8ZOwuPyLPg85M92qvCw').then(
      (result) => {
        console.log(result);
        setShowSpinner(false);
        setAlert(true);
        setAlertType('alert-success-email');
        setAlertMessage('Thank you for connecting with Hill City! Your message was sent.');
      },
      (error) => {
        console.log(error);
        setShowSpinner(false);
        setAlert(true);
        setAlertType('alert-danger');
        setAlertMessage('There was a problem sending your message. Please try again.');
      }
    );
    e.target.reset();
  };

  return (
    <>
      <button onClick={() => setConnectModal(true)} className="btn btn-primary connect-card-btn media-button" rel="noopener noreferrer">
        <i className="fas fa-address-card"></i> Connect Card
      </button>
      <Modal isOpen={connectModal} toggle={() => setConnectModal(false)}>
        <div className="modal-header justify-content-center connect-card-header">
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
          <h4 className="title title-up">LET'S CONNECT</h4>
        </div>
        <ModalBody>
          {showSpinner ? <Spinner /> : null}
          {alert ? (
            <div className={`alert ${alertType}`} role="alert">
              {alertMessage}
            </div>
          ) : null}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="connectName">First Name (Required)</label>
              <input type="text" className="form-control" id="name" name="name" required onFocus={() => setAlert(false)} />
            </div>
            <div className="form-group">
              <label htmlFor="connectEmail">Email (Required)</label>
              <input type="email" className="form-control" id="email" name="email" required onFocus={() => setAlert(false)} />
            </div>
            <div className="form-group">
              <label htmlFor="connectPhone">Phone/Text</label>
              <input type="tel" className="form-control" id="phone" name="phone" onFocus={() => setAlert(false)} />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConnectCard;
