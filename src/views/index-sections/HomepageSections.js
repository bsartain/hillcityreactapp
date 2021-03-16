import React, { useEffect, useContext, useState } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap"
import  Spinner from 'components/Spinner/Spinner'


import { StoreContext } from 'index'
import { useObserver } from 'mobx-react'

// core components

function HomepageSections() {
  
  const store = useContext(StoreContext)
  const [footerContent, setfooterContent] = useState([])

  useEffect(() => {

    window.scroll(0, 0)

    async function getFooterContent(){
      fetch('https://hillcitysc.com/wp-json/acf/v3/posts/9262').then(res => {
        return res.json()
      }).then(data => {
        setfooterContent(data)
      })
    }
    getFooterContent()

  }, [])

  return useObserver(() => (
    <div className="homepage-sections">
      <Container className="homepage-sections-service-info">
        <Row>
          <Col md="12">
            {store.pagesData.length === 0
              ? null 
              : store.pagesData.filter(item => item.id === 9270).map(item => {
                return <div key={item.id} dangerouslySetInnerHTML={{__html: item.content.rendered }}/>
              })
            }
            <p>&nbsp;</p>
          </Col>
        </Row>
      </Container>
      <div>
      {footerContent.length === 0
        ? null 
        : <iframe src={footerContent.length === 0 ? null : footerContent.acf.footer_map} width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0" title="Hill City Church Map"></iframe>
      }
      </div>
      {store.homePageData.length === 0
          ? <Spinner/>
          : store.homePageData.acf.homepage.map((item, index) => {
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
  ))
}

export default HomepageSections;
