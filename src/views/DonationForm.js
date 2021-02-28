/* eslint-disable no-undef */
import React from 'react'


var LoadCDScripts = function () {
    var cdscript = document.createElement('script');
    cdscript.onerror = function (e) {
        document.head.removeChild(this);
        setTimeout(LoadCDScripts, 1750);
    };
    cdscript.onload = function () {
        CustomDonations.BuildForm({
        account: '7b80c7b3-bbfd-42c7-b6d8-4f968af6ad22',
        form: 'bbe7ecff-ea2e-42a5-b37d-7d30da4a3acc',
        allocation: null, /* optional. Use an allocation ID, like 'AH664' (w/ quotes) to be default selected on form load */
        memberId: null, /* optional. If the current user is authenticated, you can insert their user ID, like '02943' (with quotes) */
        apiVersion: 'v1',
        interval: null, /* if null, then user must select one time or recurring (if enabled). Optionally can set to 'once', 'monthly','quarterly', or 'yearly' */
        loadingText: 'Loading Secure Form...',
        paymentVersion: 2, /*  1: for modal payment window. 2: for inline payment with Google/Apple Pay options */
        baseUrl: 'https://api.customdonations.com',
        mode: 'live', /* change to 'test' to run in test mode. Use card 4242 4242 4242 4242 for testing. */
      });
    };
    cdscript.src = "https://api.customdonations.com/v1/js/form-builder.min.js?v=" + new Date().getTime();
    document.head.appendChild(cdscript);
  }

const DonationForm = () => {
    return (
        <div className="container">
            <h4>Donation Form For Hill City</h4>
            { LoadCDScripts() }
            <div id="CustomDonationsForm"></div>
        </div>
    )
}
export default DonationForm