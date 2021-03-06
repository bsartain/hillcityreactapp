/*eslint-disable*/
import React, { useEffect, useState } from "react";

import { Container } from "reactstrap";

function PageHeader({ headerData, sermonHeaderData }) {

  let setImage
  let setTitle

  if(headerData !== null){
    setImage = headerData.better_featured_image.media_details.sizes.medium_large.source_url
    setTitle = headerData.title.rendered 
  } else {
    setImage = sermonHeaderData._featured_url
    setTitle = 'Sermons'
  }
  
  let pageHeader = React.createRef();

  return (
    <>
      <div className="page-header clear-filter">
        <div>
          <div className="overlay"></div>
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + setImage + ")",
            }}
            ref={pageHeader}
          ></div>
        </div>

        <Container>
          <div className="content-center brand">
            <div className="homepage-carousel-title-container">
              <div className="homepage-carousel-header-content">
                <h5>HILL CITY CHURCH</h5>
                <hr className="hr-one"/>
                <h1 dangerouslySetInnerHTML={{__html: setTitle }}/>
                <div className="page-header-arrow" onClick={() => window.scrollTo({top: 926, behavior: 'smooth' })}>
                  <i className="now-ui-icons  arrows-1_minimal-down"></i>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default PageHeader;
