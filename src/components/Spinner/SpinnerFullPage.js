import React from 'react'

export default function SpinnerFullPage() {

    const styles = {
        backgroundImage: "url(" + require("assets/img/Jesus.jpg") + ")",
    }

    return (
        <div style={styles} className="spinner-full-container">
            <div className="overlay"></div>
            <div className="spinner-full-position">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}
