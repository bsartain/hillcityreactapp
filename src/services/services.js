export const getPagesData = async () => {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=30");
  const data = await response.json();
  return data;
};

export const getHomePageData = async () => {
  const response = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/86");
  const data = await response.json();
  return data;
};

export const getSermonDataService = async (url) => {
  const sermonDataResponse = await fetch(url);
  const sermonData = await sermonDataResponse.json();
  const preacherResponse = await fetch("https://hillcitysc.com/wp-json/wp/v2/wpfc_preacher");
  const preacherData = await preacherResponse.json();
  const sermonSeriesResponse = await fetch("https://hillcitysc.com/wp-json/wp/v2/wpfc_sermon_series");
  const sermonSeriesData = await sermonSeriesResponse.json();

  sermonData.forEach((sermon) => {
    preacherData.forEach((preacher) => {
      if (sermon.wpfc_preacher[0] === preacher.id) {
        sermon.wpfc_preacher.push(preacher.name);
      }
    });
    sermonSeriesData.forEach((series) => {
      if (sermon.wpfc_sermon_series[0] === series.id) {
        sermon.wpfc_sermon_series.push(series.name);
      }
    });
  });

  return sermonData;
};

export const getSermonPreacher = async () => {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/wpfc_preacher");
  const data = await response.json();
  return data;
};

export const getSermonSeries = async () => {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/wpfc_sermon_series");
  const data = await response.json();
  return data;
};

export const getSermonBibleBooks = async () => {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/wpfc_bible_book?per_page=66");
  const data = await response.json();
  return data;
};

export const getOrderOfServiceData = async () => {
  const response = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/8857");
  const data = await response.json();
  return data;
};
