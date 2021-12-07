import { getSermonDataServiceTwo } from "services/services";

export function MainStore() {
  return {
    mediaPlayerIsDisplayed: false,
    isPlaying: false,
    pagesData: [],
    homePageData: [],
    getSermonData: (url) => {
      return getSermonDataServiceTwo(url);
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
