import { getSermonDataService } from "services/services";

export function PagesStore() {
  return {
    mediaPlayerIsDisplayed: false,
    isPlaying: false,
    pagesData: [],
    homePageData: [],
    getSermonData: (url) => {
      return getSermonDataService(url);
    },
    sliceSermonData: (sermonData, indexOfFirstSermon, indexOfLastSermon) => {
      let slicedData;
      if (sermonData.length !== 0) {
        slicedData = sermonData.slice(indexOfFirstSermon, indexOfLastSermon);
      }
      return slicedData;
    },
    orderOfServiceData: [],
    isSpecialAnnouncement: false,
  };
}
