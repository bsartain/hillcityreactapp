import React, { useContext, useState } from 'react';
import { StoreContext } from 'stores/StoreContext';
import { useObserver } from 'mobx-react';
import Spinner from 'components/Spinner/Spinner';
import { getSermonDataServiceTwo } from 'services/services';
import { runInAction } from 'mobx';

const sermonUrl = new URL('https://hillcitysc.com/wp-json/hc/v1/hc-sermons');

export default function SermonFilter() {
  const store = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const preacherList = [];
  const seriesList = [];
  const bibleBookList = [];
  store.sermonStore.sermonFilterData.forEach((item) => {
    if (item.preacher) {
      item.preacher.map((item) => {
        return preacherList.push(item.name);
      });
    }
    if (item.sermon_series) {
      item.sermon_series.map((item) => {
        return seriesList.push(item.name);
      });
    }
    if (item.bible_book) {
      item.bible_book.map((item) => {
        return bibleBookList.push(item.name);
      });
    }
  });
  const preacherListReduced = new Set(preacherList);
  const preacherListArray = [...preacherListReduced];
  const seriesListReduced = new Set(seriesList);
  const seriesListArray = [...seriesListReduced];
  const bibleBookListListReduced = new Set(bibleBookList);
  const bibleBookListListArray = [...bibleBookListListReduced];

  let valueSlug;

  const formatValueToSlug = (value) => {
    return value.toLowerCase().replace(' ', '-');
  };

  const handleChange = async (e) => {
    setLoading(true);
    if (e.target.id === 'preacher') {
      valueSlug = await formatValueToSlug(e.target.value);
      sermonUrl.searchParams.delete('preacher');
      if (valueSlug) {
        sermonUrl.searchParams.append('preacher', `${valueSlug}`);
      }
    } else if (e.target.id === 'sermon_series') {
      valueSlug = await formatValueToSlug(e.target.value);
      sermonUrl.searchParams.delete('series');
      if (valueSlug) {
        sermonUrl.searchParams.append('series', `${valueSlug}`);
      }
    } else if (e.target.id === 'bible_book') {
      valueSlug = await formatValueToSlug(e.target.value);
      sermonUrl.searchParams.delete('book');
      if (valueSlug) {
        sermonUrl.searchParams.append('book', `${valueSlug}`);
      }
    }

    const response = await getSermonDataServiceTwo(sermonUrl.href);
    if (response.length === 0) {
      runInAction(() => {
        store.sermonStore.sermonsEmpty = true;
      });
    } else {
      runInAction(() => {
        store.sermonStore.sermonsEmpty = false;
        store.sermonStore.sermonData = response;
      });
    }
    setLoading(false);
  };

  return useObserver(() => (
    <div className="container">
      <form className="sermon-filter-form-container">
        <div className="form-group">
          <label htmlFor="wpfc_preacher">Preacher</label>
          <select className="form-control" id="preacher" onChange={handleChange}>
            <option value={null}></option>
            {!preacherListArray ? (
              <h4>Loading...</h4>
            ) : (
              preacherListArray.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="wpfc_sermon_series">Sermon Series</label>
          <select className="form-control" id="sermon_series" onChange={handleChange}>
            <option value={null}></option>
            {!seriesListArray ? (
              <h4>Loading...</h4>
            ) : (
              seriesListArray.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="wpfc_bible_book">Bible Books</label>
          <select className="form-control" id="bible_book" onChange={handleChange}>
            <option value={null}></option>
            {!bibleBookListListArray ? (
              <h4>Loading...</h4>
            ) : (
              bibleBookListListArray.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            )}
          </select>
        </div>
      </form>
      {loading ? <Spinner /> : null}
    </div>
  ));
}
