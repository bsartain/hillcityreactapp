import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselItem } from 'reactstrap';

const CarouselHomePage = ({ headerData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === headerData.homepage_slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? headerData.homepage_slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = !headerData
    ? null
    : headerData.homepage_slides.map((item, index) => {
        return (
          <CarouselItem className="custom-tag" tag="div" key={index} onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
            <div
              style={{
                backgroundImage: 'url(' + item.slides + ')',
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
                backgroundPosition: 'center',
              }}
            ></div>
          </CarouselItem>
        );
      });
  const setHeaderText = () => {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    if (day === 0 && hours < 12) {
      return (
        <div>
          <h1>Join Our Live Stream</h1>
          <Link to="/live-stream" className="btn btn-outline-primary" style={{ color: '#ffffff', marginBottom: '38px', fontWeight: '600' }}>
            JOIN LIVESTREAM
          </Link>
        </div>
      );
    } else {
      return (
        <>
          <h1 dangerouslySetInnerHTML={{ __html: headerData.homepage_title }} />
          {headerData.homepage_button_link && headerData.homepage_button_link_text ? (
            <Link to={headerData.homepage_button_link} className="btn btn-outline-primary" style={{ color: '#ffffff', marginBottom: '38px', fontWeight: '600' }}>
              {headerData.homepage_button_link_text}
            </Link>
          ) : null}
        </>
      );
    }
  };

  return (
    <div className="homepage-carousel">
      <div className="homepage-carousel-title-container">
        <div className="homepage-carousel-header-content">
          <h5>HILL CITY CHURCH</h5>
          <hr className="hr-one" />
          {setHeaderText()}
          <h6 dangerouslySetInnerHTML={{ __html: headerData.homepage_excerpt }} />
          <div className="page-header-arrow-home-page" onClick={() => window.scrollTo({ top: 926, behavior: 'smooth' })}>
            <i className="now-ui-icons  arrows-1_minimal-down"></i>
          </div>
        </div>
      </div>
      <style>
        {`.custom-tag {
              max-width: 100%;
              height: 100%;
              background: black;
            }`}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous} className="carousel-fade" autoPlay={true} ride="carousel">
        {slides}
      </Carousel>
    </div>
  );
};

export default CarouselHomePage;
