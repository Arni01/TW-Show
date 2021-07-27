const original = 'https://image.tmdb.org/t/p/original';
const small = 'https://image.tmdb.org/t/p/w500';
const API = 'https://api.themoviedb.org/3';
const API_KEY = '6e6736e6ab781fd3a1a7c3b7add7654b';

const data = {
  movies_details: '/movie/{movie_id}?',
  movies_videos: '/movie/{movie_id}/videos?',
  release_dates: '/movie/{movie_id}/release_dates?',
  discover_movie: '/discover/movie?',
  discover_tv: '/discover/tv?',
  api_key: `api_key=${API_KEY}`,
  language: 'language=en-US',
  popularity_asc: 'sort_by=popularity.asc',
  popularity_desc: 'sort_by=popularity.desc',
  release_date_asc: 'sort_by=release_date.asc',
  release_date_desc: 'sort_by=release_date.desc',
  include_adult: 'include_adult=false',
  include_video: 'include_video=false',
};

const changeSting = (str, argReplace, valueReplace) => {
  return str.replace(argReplace, valueReplace);
};

const getURL = (arr, id, page) => {
  let url = API;

  arr.forEach((el, index) => {
    if (data[el] === undefined) {
      console.error('arguments is not in object data: ', el);
    }
    if (index === arr.length - 1 || index === 0) {
      url += data[el];
    } else {
      url += data[el] + '&';
    }
  });

  if (id) {
    url = changeSting(url, '{movie_id}', id);
  }
  if (page) {
    url += '&' + page;
  }

  return url;
};

export function requestTMD(arr, id, page) {
  let url = getURL(arr, id, page);
  let request = new Promise((resolve, reject) => {
    fetch(url).then((data) => {
      resolve(data.json());
    });
  });
  return request;
}

export function renderMovie(movie) {
  return `<div class="movies-item"> 
            <a class="movies__link" href="movie.html?id=${movie.id}">
              <h3 class="movies__title">${movie.title || movie.name}</h3>
              <div class="movies__img">
                <img src="${small + movie.poster_path}" alt="${
    movie.title || movie.name
  }">
                <div class="movies__info active-link"> 
                  <span class="movies__info-year">${
                    movie.release_date || movie.first_air_date
                  }</span>
                  <span class="movies__info-rating rating">${
                    movie.vote_average
                  }</span>
                  <p class="movies__info-overview">${movie.overview}</p>
                </div>
              </div>              
            </a>
          </div>`;
}

export default { original, small };
