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

export const getSermonDataServiceTwo = async (url) => {
  const sermonDataResponse = await fetch(url);
  const sermonData = await sermonDataResponse.json();
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
