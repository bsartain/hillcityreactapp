import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem } from "reactstrap";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption: "Slide 1",
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "Slide 2",
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "Slide 3",
  },
  {
    id: 4,
    altText: "Slide 4",
    caption: "Slide 4",
  },
  {
    id: 5,
    altText: "Slide 5",
    caption: "Slide 5",
  },
];

const CarouselHomePage = ({ headerData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = !headerData
    ? null
    : headerData.homepage_slides.map((item, index) => {
        return (
          <CarouselItem className="custom-tag" tag="div" key={index} onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
            <div
              style={{
                backgroundImage: "url(" + item.slides + ")",
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
                backgroundPosition: "center",
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
          <Link to="/live-stream" className="btn btn-outline-primary" style={{ color: "#ffffff", marginBottom: "38px", fontWeight: "600" }}>
            JOIN LIVESTREAM
          </Link>
        </div>
      );
    } else {
      return <h1>WELCOME</h1>;
    }
  };

  return (
    <div className="homepage-carousel">
      <div className="homepage-carousel-title-container">
        <div className="homepage-carousel-header-content">
          <h5>HILL CITY CHURCH</h5>
          <hr className="hr-one" />
          {setHeaderText()}
          <h6>For the Truth, Goodness and Beauty of Jesus, For the Flourishing of Rock Hill</h6>
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
