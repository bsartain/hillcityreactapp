/* eslint-disable array-callback-return */
import React, { useEffect, useState, forwardRef } from 'react'
import { esvApi } from 'utils/utils'
import catechismData from 'data/catechismData'
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
  } from "reactstrap";

export const offeratory = () => {
    return <div>
        <h3>Offeratory</h3>
        <p>In response to what the Lord has done for us, let’s worship Him in the giving of our tithes and offerings.</p>
        <p>We do this as an expression of joy and gratitude, not obligation. Below you’ll find a link to our giving page. If you are a member of Hill City Church please give joyously and generously.</p>
        <button className="btn btn-primary">Give Online</button>
        <hr className="order-service-hr" />
    </div>
}

export const catechismQuestion = (acfData, catechismData) => {

    let catechismQuestion
    let catechismAnswer

    if(acfData.length !== 0){
        return <div>
                    <h3>Catechism Question { acfData[0].catechism_question_number }</h3>
                    {catechismData
                        ? catechismData.forEach((item, index) => {
                            if(acfData[0].catechism_question_number - 1 === index){
                                catechismQuestion = item.question
                                catechismAnswer = item.answer.adult
                            }
                        })
                        : null
                    }
                    <p><span style={{fontWeight: '900'}}>QUESTION: </span>{ catechismQuestion }</p>
                    <p><span style={{fontWeight: '900'}}>ANSWER: </span>{ catechismAnswer }</p>
                    <hr className="order-service-hr" />
                </div>
    }
}

export const miscellaneous = (acfData) => {
    if(acfData.length !== 0){
        return <div>
                <div dangerouslySetInnerHTML={{__html: acfData[0].miscellaneous_info }} />
            </div>
    }
}

export const announcements = (acfData) => {

    const announcementMarkup = (title, content, start, end, location, index) => {
        return <div key={index} className={ title && content ? 'show-announcements' : 'hide-announcements' }>
                    <h3>{ title }</h3>
                    <div dangerouslySetInnerHTML={{__html: content }}/>
                    <div className="date-time-container">
                        <div className={ start ? 'show-announcements' : 'hide-announcements' }>
                            <span>Begin: </span>{ start }
                        </div>
                        <div className={ end ? 'show-announcements' : 'hide-announcements' }>
                            <span>End: </span>{ end }
                        </div>
                        <div className={ location ? 'show-announcements' : 'hide-announcements' }>
                            <span>Location: </span>{ location }
                        </div>
                    </div>
                    <hr className="order-service-hr" />
                </div>
    }


    if(acfData.length !== 0){

        let announcementOne
        let announcementTwo
        let announcementThree
        let announcementFour

        return <div>
                    {acfData.map((item, index) => {
                        for (const [key] of Object.entries(item)) {
                            if(key === 'announcement_one'){
                                const one = item.announcement_one
                                announcementOne = announcementMarkup( 
                                    one.announcement_one_title, 
                                    one.announcement_one_content, 
                                    one.announcement_one_start, 
                                    one.announcement_one_end, 
                                    one.announcement_one_location, 
                                    one.announcement_one_title 
                                )
                            } else if(key === 'announcement_two'){
                                const two = item.announcement_two
                                announcementTwo = announcementMarkup( 
                                    two.announcement_two_title, 
                                    two.announcement_two_content, 
                                    two.announcement_two_start, 
                                    two.announcement_two_end, 
                                    two.announcement_two_location, 
                                    two.announcement_two_title 
                                )
                            } else if(key === 'announcement_three'){
                                const three = item.announcement_three
                                announcementThree = announcementMarkup( 
                                    three.announcement_three_title, 
                                    three.announcement_three_content, 
                                    three.announcement_three_start, 
                                    three.announcement_three_end, 
                                    three.announcement_three_location, 
                                    three.announcement_three_title 
                                )
                            } else if(key === 'announcement_four'){
                                const four = item.announcement_four
                                announcementFour = announcementMarkup( 
                                    four.announcement_four_title, 
                                    four.announcement_four_content, 
                                    four.announcement_four_start, 
                                    four.announcement_four_end, 
                                    four.announcement_four_location, 
                                    four.announcement_four_title 
                                )
                            } 
                        }
                    })
                    }
                    { announcementOne }
                    { announcementTwo }
                    { announcementThree }
                    { announcementFour }
                </div>

    }
}

export const setScriptureContent = (title, passage) => {
    if(passage.length !== 0){
        return <div>
                    <h3>{ title }</h3>
                    { title === 'Confession Of Sin' 
                        ? <p>You cannot out sin God’s grace. The power of the cross is such that Jesus made His love and forgiveness more powerful toward you than your offenses toward Him……</p> 
                        : null 
                    }
                    <div className="order-service-div" dangerouslySetInnerHTML={{__html: passage[0].passages }} />
                    <hr className="order-service-hr" />
                </div>
        
    }
}

export const setSongContent = (title, lyrics) => {
    return <div>
                <h3>{ title }</h3>
                <div dangerouslySetInnerHTML={{__html: lyrics }} />
                <hr className="order-service-hr" />
            </div>
    
}

let callToWorshipService
let songOneService
let confessionOfSinService
let assuranceOfGraceService
let songTwoService
let scriptureReadingService
let preacherService
let catechismService
let songThreeService
let benedictionService

export const OrderOfService = forwardRef(({acfData, printLogo}, ref) => {
    
    const [callToWorship, setCallToWorship] = useState([])
    const [confession, setConfession] = useState([])
    const [assurance, setAssurance] = useState([])
    const [scripture, setScripture] = useState([])
    const [benediction, setBenediction] = useState([])
    const [iconPills, setIconPills] = useState("1");

    useEffect(() => {
        acfData.map((item) => {
            esvApi(item.call_to_worship_verse).then(verseData => setCallToWorship([verseData]))
            esvApi(item.confession_of_sin_verse).then(verseData => setConfession([verseData]))
            esvApi(item.assurance_of_grace_verse).then(verseData => setAssurance([verseData]))
            esvApi(item.scripture_reading).then(verseData => setScripture([verseData]))
            esvApi(item.benediction_verse).then(verseData => setBenediction([verseData]))
        })
        window.scrollTo(0, 0)
    }, [acfData])

    return (
        <div className="order-service-container">
            <Container>
                  <Nav role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("1");
                        }}
                      >
                        Order Of Service
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("2");
                        }}
                      >
                        Announcements
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                        {acfData.length !== 0  
                            ? acfData.map((item, index) => {
                                callToWorshipService = setScriptureContent('Call To Worship', callToWorship)
                                songOneService = setSongContent(item.song_one_title, item.song_one_lyrics)
                                confessionOfSinService = setScriptureContent('Confession Of Sin', confession)
                                assuranceOfGraceService = setScriptureContent('Assurance Of Grace', assurance)
                                songTwoService = setSongContent(item.song_two_title, item.song_two_lyrics)
                                scriptureReadingService = setScriptureContent('Scripture Reading', scripture)
                                preacherService = <h3>Sermon: {item.preacher}<hr className="order-service-hr" /></h3>
                                catechismService = catechismQuestion(acfData, catechismData)
                                songThreeService = setSongContent(item.song_three_title, item.song_three_lyrics)
                                benedictionService = setScriptureContent('Benediction', benediction)
                            })
                            : null
                        }
                        <div className="print-order-service" ref={ref}>
                            {printLogo
                                ? <div style={{ 
                                    display:'flex', 
                                    margin: '25px 0px', 
                                    justifyContent: 'center',
                                    borderBottom: '1px solid #eeeeee',
                                    paddingBottom: '39px',
                                    marginBottom: '39px'
                                }}>
                                    <img src="https://hillcitysc.com/wp-content/uploads/2021/02/HC-print-masthead-logo-e1612377440345.png" alt="Hill City Church: Rock Hill SC"/>
                                </div>
                                : null
                            }
                            

                            { callToWorshipService }
                            { songOneService }
                            { confessionOfSinService }
                            { assuranceOfGraceService }
                            { printLogo ? null : offeratory() }
                            { songTwoService }
                            { scriptureReadingService }
                            { preacherService }
                            { catechismService }
                            { songThreeService }
                            { benedictionService }
                            { printLogo ? null : miscellaneous(acfData) }
                        </div>
                    </TabPane>
                    <TabPane tabId="iconPills2">
                        { announcements(acfData) }
                    </TabPane>
                  </TabContent>
        </Container>
        </div>
    )
})