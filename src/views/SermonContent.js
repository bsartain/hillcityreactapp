import React from 'react'
import Spinner from 'components/Spinner/Spinner'
import { formatDate } from 'utils/utils'
import { useHistory } from 'react-router-dom'
import { RefTagger } from 'react-reftagger'


export const setPreacher = (preacher) => {
    if(preacher[0] === 35){
        return 'Brett Sartain'
    } else if(preacher[0] === 27){
        return 'Buzzy Elder'
    } else if(preacher[0] === 32){
        return 'Fred Shope'
    } else if(preacher[0] === 46){
        return 'Kirk Irwin'
    }
}

export const setSermonSeries = (sermonSeries) => {
    if(sermonSeries[0] === 86){
        return 'Kingdom Manifesto - The Sermon On The Mount'
    } else if(sermonSeries[0] === 79){
        return 'Advent in Isaiah'
    } else if(sermonSeries[0] === 28){
        return 'The Apostles Creed'
    }
}   

export const SermonContent = ({ sermonData, loading }) => {

    let history = useHistory();

    if(loading){
        return <Spinner/>
    }

    const getSingleSermon = (sermon) => {
        history.push(`/single-sermon/${sermon.id}`)
    }

    return (
        <div className="container sermon-content-container"> 
                <RefTagger noSearchTagNames={["h1","h2","h3","h4","h5"]} bibleVersion={'ESV'}/>           
                 <div className="card-deck">
                    {sermonData.map((sermon, index) => {          
                        return <div key={index} className="card-outer-container col-md-6 col-lg-4">
                                    <div key={index} className="card">
                                        <div className="card-background" style={{ backgroundImage: "url(" + sermon._featured_url + ")" }}></div>
                                        <div className="card-body">
                                            <p className="card-sermon-series">{ setSermonSeries(sermon.wpfc_sermon_series) }</p>
                                            <h4 className="card-title" dangerouslySetInnerHTML={{__html: sermon.title.rendered }} onClick={() => getSingleSermon(sermon)}/>
                                            <p className="card-date">{ formatDate( sermon.date )  }</p>
                                            <hr className="card-hr" />
                                            <div className="card-text card-date-passage">
                                                <p className="card-preacher">Preacher: <span className="card-detail-color">{ setPreacher(sermon.wpfc_preacher) }</span> </p>
                                                <span className="card-detail-divider">|</span>
                                                <p className="card-passage">Passage: <span className="card-detail-color">{ sermon.bible_passage }</span></p>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div> 
                    })}
                </div>
        </div>
    )
}

