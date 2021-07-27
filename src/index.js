import './assets/scss/style.scss';
import { requestTMD, renderMovie } from './js/module/request';

const moviesContainer = document.querySelector('.movies');
// const tvContainer = document.querySelector('.tv-shows');

// const renderMovie = (movie) => {
//   return `<div class="movies-item">
//             <a class="movies__link" href="movie.html?id=${movie.id}">
//               <h3 class="movies__title">${movie.title || movie.name}</h3>
//               <div class="movies__img">
//                 <img src="${URLImg.small + movie.poster_path}" alt="${
//     movie.title || movie.name
//   }">
//                 <div class="movies__info active-link">
//                   <span class="movies__info-year">${
//                     movie.release_date || movie.first_air_date
//                   }</span>
//                   <span class="movies__info-rating rating">${
//                     movie.vote_average
//                   }</span>
//                   <p class="movies__info-overview">${movie.overview}</p>
//                 </div>
//               </div>
//             </a>
//           </div>`;
// };

let moviesReqest = requestTMD([
  'discover_movie',
  'api_key',
  'language',
  'popularity_desc',
  'include_adult',
  'include_video',
]);

// let tvShowsReqest = requestTMD([
//   'discover_tv',
//   'api_key',
//   'language',
//   'popularity_desc',
// ]);

moviesReqest
  .then(({ results }) => {
    results.splice(0, 12).forEach((item) => {
      moviesContainer.insertAdjacentHTML('beforeend', renderMovie(item));
    });
  })
  .catch((err) => console.error('Ошибка запроса:', err));

// tvShowsReqest
//   .then(({ results }) => {
//     results.splice(0, 6).forEach((item) => {
//       tvContainer.insertAdjacentHTML('beforeend', renderMovie(item));
//     });
//   })
//   .catch((err) => console.error('Ошибка запроса:', err));
