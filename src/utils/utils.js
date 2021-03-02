import React from "react";
import { Helmet } from "react-helmet";


export const MetaDecorator = ({title, description, image, url}) => {
    return <Helmet>
                {/* Facebook Meta Tags */}
                <meta charSet="utf-8" />
                <meta property="og:title" content={`${ title } | Hill City Church`}/>
                <meta property="og:description" content={ description }/>
                <meta property="og:image" content={ image }/>
                <meta property="og:url" content={ url }/>
                {/* Twitter Meta Tags */}
                <meta name="twitter:title" content={`${ title } | Hill City Church`}/>
                <meta name="twitter:description" content={ description }/>
                <meta name="twitter:image" content={ image }/>
                <meta name="twitter:card" content={ url }></meta>
            </Helmet>   
}

export const esvApi = async(verse) => {

    const url = `https://api.esv.org/v3/passage/html/?q=${verse}&include-footnotes=false&include-audio-link=false&include-headings=false&include-short-copyright=false`
    
    const response = await fetch(url, {
        headers:{
            'Authorization':'Token 8ea1a445b74a5d683af4d71f322ae221e2ac682c'
        }
    })
    const bibleJson = await response.json()
    const biblePassage = bibleJson
    
    return biblePassage
}

export const nextSundaysDate = () => {
    const targetDate = new Date();
    const whatDay = targetDate.getDay();
    const setDay = whatDay === 0 ? 7 : whatDay
    targetDate.setDate(targetDate.getDate() + 7 - setDay);

    const dd = targetDate.getDate();
    const mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    const yyyy = targetDate.getFullYear();

    const dateString = mm + "/" + dd + "/" + yyyy;
    return dateString
}

export const formatDate = (dateString) => {
    const d = new Date(dateString);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const formattedDate = `${mo} ${da}, ${ye}`
    return formattedDate
}