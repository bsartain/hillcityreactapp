import React from "react";
import Spinner from "components/Spinner/Spinner";
import { formatDate } from "utils/utils";
import { useHistory } from "react-router-dom";
import { RefTagger } from "react-reftagger";

export const SermonContent = ({ sermonData, loading }) => {
  let history = useHistory();

  if (loading) {
    return <Spinner />;
  }

  const getSingleSermon = (sermon) => {
    history.push(`/single-sermon/${sermon.id}`);
  };

  return (
    <div className="container sermon-content-container">
      <RefTagger noSearchTagNames={["h1", "h2", "h3", "h4", "h5"]} bibleVersion={"ESV"} />
      <div className="card-deck">
        {!sermonData
          ? null
          : sermonData.map((sermon, index) => {
              return (
                <div key={index} className="card-outer-container col-md-6 col-lg-4">
                  <div key={index} className="card">
                    <div className="card-background" style={{ backgroundImage: "url(" + sermon._featured_url + ")" }}></div>
                    <div className="card-body">
                      <p className="card-sermon-series">{sermon.wpfc_sermon_series[1]}</p>
                      <h4 className="card-title" dangerouslySetInnerHTML={{ __html: sermon.title.rendered }} onClick={() => getSingleSermon(sermon)} />
                      <p className="card-date">{formatDate(sermon.date)}</p>
                      <hr className="card-hr" />
                      <div className="card-text card-date-passage">
                        <p className="card-preacher">
                          Preacher: <span className="card-detail-color">{sermon.wpfc_preacher[1]}</span>{" "}
                        </p>
                        <span className="card-detail-divider">|</span>
                        <p className="card-passage">
                          Passage: <span className="card-detail-color">{sermon.bible_passage}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
