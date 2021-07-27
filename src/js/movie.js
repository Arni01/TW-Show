import '../assets/scss/style.scss';
import URLImg, { requestTMD } from './module/request';

const idMovie = window.location.search.slice(4);
const containerBanner = document.querySelector('.container-banner');

const renderBanner = (movieInfo, certification, movieWatch) => {
  let year = movieInfo['release_date'].split('-')[0];
  let linkVideo = '';

  if (movieWatch !== undefined) {
    linkVideo = `<a href="https://www.youtube.com/watch?v=${movieWatch.key}" class="btn banner-control__play" target="_blank">Watch 
    ${movieWatch.type}</a>`;
  }

  document.title = movieInfo.title;

  return `<div class="banner">
            <h1 class="banner-title">${movieInfo.title}</h1>
            <div class="banner-info"> 
              <span class="banner-info_year">${year}</span>
              <span class="banner-info_age">${certification}</span>
              <span class="banner-info_time">${Math.floor(
                movieInfo.runtime / 60
              )}h ${movieInfo.runtime % 60}min</span>
              <span class="banner-info_rating rating">${
                movieInfo['vote_average']
              }</span>
            </div>
            <p class="banner-text">${movieInfo.overview}</p>
            <div class="banner-control"> 
              ${linkVideo}
            </div>
          </div>
          <div class="container-banner_image">
            <img class="container-banner_image" src="${
              URLImg.original + movieInfo['backdrop_path']
            }" alt="${movieInfo.title}">
          </div>`;
};

const findRelisData = (el) => {
  let relisData = { release_dates: [{ certification: 'R' }] };
  let certification;
  el = el.results.find((item) => item['iso_3166_1'] === 'US') || relisData;
  for (const item of el['release_dates']) {
    if (item['certification'] !== '') {
      certification = item['certification'];
      break;
    }
  }
  return certification;
};

let allInfoMovie = requestTMD(
  ['movies_details', 'api_key', 'language'],
  idMovie
);
let reliseData = requestTMD(['release_dates', 'api_key'], idMovie);
let movieVideo = requestTMD(['movies_videos', 'api_key', 'language'], idMovie);

Promise.all([allInfoMovie, reliseData, movieVideo]).then((responses) => {
  containerBanner.insertAdjacentHTML(
    'beforeend',
    renderBanner(
      responses[0],
      findRelisData(responses[1]),
      responses[2].results[0]
    )
  );
});
