import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, image, url }) => {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title} - Hill City Church, Rock Hill SC</title>
      <meta property="og:title" content={`${title} | Hill City Church, Rock Hill SC`} data-react-helmet="true" />
      <meta property="og:description" content={description} data-react-helmet="true" />
      <meta property="og:image" content={image} data-react-helmet="true" />
      <meta property="og:url" content={url} data-react-helmet="true" />
      <meta name="twitter:title" content={`${title} | Hill City Church, Rock Hill SC`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content={url}></meta>
    </Helmet>
  );
};

export default Meta;
