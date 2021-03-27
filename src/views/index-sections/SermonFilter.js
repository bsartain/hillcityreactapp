import React, { useContext, useState } from "react";
import { runInAction } from "mobx";
import { StoreContext } from "stores/StoreContext";
import { useObserver } from "mobx-react";
import Spinner from "components/Spinner/Spinner";

export default function SermonFilter({ sermonData }) {
  const store = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setLoading(true);

    if (e.target.id === "wpfc_preacher") {
      runInAction(() => {
        store.sermonStore.selectedPreacherId = e.target.value;
      });
    } else if (e.target.id === "wpfc_sermon_series") {
      runInAction(() => {
        store.sermonStore.selectedSeriesId = e.target.value;
      });
    } else if (e.target.id === "wpfc_bible_book") {
      runInAction(() => {
        store.sermonStore.selectedBookId = e.target.value;
      });
    }

    runInAction(async () => {
      const sermonUrl = new URL("https://hillcitysc.com/wp-json/wp/v2/wpfc_sermon?per_page=100");
      const urlParams = [store.sermonStore.selectedPreacherId, store.sermonStore.selectedSeriesId, store.sermonStore.selectedBookId];

      urlParams.forEach((param) => {
        if (param === store.sermonStore.selectedPreacherId && store.sermonStore.selectedPreacherId !== "") {
          sermonUrl.searchParams.append("wpfc_preacher", `${param}`);
        } else if (param === store.sermonStore.selectedSeriesId && store.sermonStore.selectedSeriesId !== "") {
          sermonUrl.searchParams.append("wpfc_sermon_series", `${param}`);
        } else if (param === store.sermonStore.selectedBookId && store.sermonStore.selectedBookId !== "") {
          sermonUrl.searchParams.append("wpfc_bible_book", `${param}`);
        }
      });

      const response = await fetch(sermonUrl.href);
      const json = await response.json();
      store.sermonStore.sermonData = json;
      setLoading(false);
    });
  };

  return useObserver(() => (
    <div className="container">
      <form className="sermon-filter-form-container">
        <div className="form-group">
          <label htmlFor="wpfc_preacher">Preacher</label>
          <select className="form-control" id="wpfc_preacher" onChange={handleChange}>
            <option value={null}></option>
            {!store.sermonStore.sermonPreacher.length === 0 ? (
              <h4>Loading...</h4>
            ) : (
              store.sermonStore.sermonPreacher.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="wpfc_sermon_series">Sermon Series</label>
          <select className="form-control" id="wpfc_sermon_series" onChange={handleChange}>
            <option value={null}></option>
            {!store.sermonStore.sermonSeries.length === 0 ? (
              <h4>Loading...</h4>
            ) : (
              store.sermonStore.sermonSeries.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="wpfc_bible_book">Bible Books</label>
          <select className="form-control" id="wpfc_bible_book" onChange={handleChange}>
            <option value={null}></option>
            {!store.sermonStore.sermonBibleBooks.length === 0 ? (
              <h4>Loading...</h4>
            ) : (
              store.sermonStore.sermonBibleBooks.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
