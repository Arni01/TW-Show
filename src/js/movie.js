import '../assets/scss/style.scss';

const idMovie = window.location.search.slice(4);
const URLImg = 'https://image.tmdb.org/t/p/original';
const URLInfoMovie = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=6e6736e6ab781fd3a1a7c3b7add7654b&language=en-US`;
const URLRelisData = `https://api.themoviedb.org/3/movie/${idMovie}/release_dates?api_key=6e6736e6ab781fd3a1a7c3b7add7654b`;
const URLMovieVideo = `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=6e6736e6ab781fd3a1a7c3b7add7654b&language=en-US`;

const containerBanner = document.querySelector('.container-banner');

const renderBanner = (movieInfo, certification, movieWatch) => {
  let year = movieInfo['release_date'].split('-')[0];
  let linkVideo = '';

  if (movieWatch !== undefined) {
    linkVideo = `<a href="https://www.youtube.com/watch?v=${movieWatch.key}" class="btn banner-control__play" target="_blank">Watch 
    ${movieWatch.type}</a>`;
  }

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
              URLImg + movieInfo['backdrop_path']
            }" alt="${movieInfo.title}">
          </div>`;
};

const requestTMD = (url) => {
  let request = new Promise((resolve, reject) => {
    fetch(url).then((data) => {
      resolve(data.text());
    });
  });
  return request;
};

const findRelisData = (el) => {
  let relisData = { release_dates: [{ certification: 'R' }] };
  let certification;
  el = el.results.find((item) => item['iso_3166_1'] === 'US') || relisData;
  // el = el['release_dates'] || certification;
  for (const item of el['release_dates']) {
    if (item['certification'] !== '') {
      certification = item['certification'];
      break;
    }
  }
  // return el.results.find((item) => item['iso_3166_1'] === 'US')[
  //   'release_dates'
  // ][0];
  return certification;
};

let allInfoMovie = requestTMD(URLInfoMovie);
let reliseData = requestTMD(URLRelisData);
let movieVideo = requestTMD(URLMovieVideo);

Promise.all([allInfoMovie, reliseData, movieVideo]).then((responses) => {
  let responsesJSON = responses.map((el) => JSON.parse(el));
  containerBanner.insertAdjacentHTML(
    'beforeend',
    renderBanner(
      responsesJSON[0],
      findRelisData(responsesJSON[1]),
      responsesJSON[2].results[0]
    )
  );
});
