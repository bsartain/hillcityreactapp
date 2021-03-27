/*eslint-disable*/
import React, { useEffect, useState } from "react";

// reactstrap components
import { Container } from "reactstrap";

import CarouselHomePage from "views/index-sections/CarouselHomePage";
import image from "assets/img/Jesus.jpg";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/86");
      const data = await response.json();
      setHeaderData(data.acf);
    };
    getData();
  }, []);

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        {headerData.length === 0 ? (
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + image + ")",
            }}
            ref={pageHeader}
          ></div>
        ) : (
          <div className="homepage-carousel-container">
            <div className="overlay"></div>
            <CarouselHomePage headerData={headerData} />
          </div>
        )}

        <Container>
          <div className="content-center brand">
            <div className="homepage-carousel-title-container">
              <div className="homepage-carousel-header-content">
                <h1 style={{ color: "#ffffff" }}>JESUS</h1>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
