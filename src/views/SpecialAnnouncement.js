import React, { useEffect, useState, useContext } from "react";

import { useObserver } from "mobx-react";
import { StoreContext } from "stores/StoreContext";
import { runInAction } from "mobx";
import { Modal, ModalBody } from "reactstrap";

function SpecialAnnouncement() {
  const store = useContext(StoreContext);

  const [modal, setModal] = useState(true);
  const [specialAnnouncement, setSpecialAnnouncement] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/8857");
      const data = await response.json();
      setSpecialAnnouncement([data.acf]);
    };
    getData();
  }, []);

  return useObserver(() => (
    <>
      {specialAnnouncement.length === 0
        ? null
        : // eslint-disable-next-line array-callback-return
          specialAnnouncement.map((item, index) => {
            if (item.special_announcement.length > 0) {
              runInAction(() => {
                store.isSpecialAnnouncement = true;
              });
              return (
                <div key={index}>
                  <Modal isOpen={modal} toggle={() => setModal(false)} className="special-announcement-container">
                    <div className="modal-header justify-content-center">
                      <button className="close" type="button" onClick={() => setModal(false)}>
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                      </button>
                      <h4 className="title title-up">Important Announcement</h4>
                    </div>
                    <ModalBody>
                      <div dangerouslySetInnerHTML={{ __html: item.special_announcement }} />
                    </ModalBody>
                  </Modal>
                </div>
              );
            }
          })}
    </>
  ));
}

export default React.memo(SpecialAnnouncement);
