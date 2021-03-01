import React, { useEffect, useState } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import  Spinner from 'components/Spinner/Spinner'
import { Link } from 'react-router-dom'

// core components

function HomepageSections() {

  const [homeSections, setHomeSections] = useState()

  useEffect(() => {

    async function fetchData(){
      const response = await fetch('https://hillcitysc.com/wp-json/acf/v3/posts/86');
      const data = await response.json()
      setHomeSections(data.acf)
    }
    fetchData()

  }, [])


  return (
    <div className="homepage-sections">
      <Container className="homepage-sections-service-info">
        <Row>
          <Col md="12">
          <div>
            <h2>Sunday Gathering: 10:00AM</h2>
            <p>We are holding our Sunday morning gatherings in the Gettys Art Center in downtown Rock Hill. We ask that you bring a chair and a mask for safety reasons. There will not be refreshments served but feel free to bring your coffee and or a snack during service. Come join us as we worship.</p>
            <h2>Church Online</h2>
            <p>You can also view our service live via Zoom by heading to our <Link to='live-stream' title="liveStream" href="https://hillcitysc.com/online-worship/">Live Stream page</Link>.</p>
          </div>
          </Col>
        </Row>
      </Container>
      <div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13085.041201354099!2d-81.0258453!3d34.9250082!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x64f7a6109e565477!2sTom%20S.%20Gettys%20Art%20Center!5e0!3m2!1sen!2sus!4v1603761252934!5m2!1sen!2sus" width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0" title="Hill City Church Map"></iframe>
      </div>
      {!homeSections
          ? <Spinner/>
          : homeSections.homepage.map((item, index) => {
            const sectionStyles= {
              background: "url(" + item.image + ")",
              backgroundColor: `${item.background_color}`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              color: `${item.text_color}`
            }
            return <div 
                      key={index} 
                      style={ sectionStyles }
                      className={item.image ? 'with-image' : 'with-content'}
                      >
                      <div dangerouslySetInnerHTML={{__html: item.content}} />
                  </div>
          })
        }
    </div>
  );
}

export default HomepageSections;
