import './assets/scss/style.scss';
import { requestTMD, renderMovie } from './js/module/request';

const moviesContainer = document.querySelector('.movies');
let moviesReqest = requestTMD([
  'discover_movie',
  'api_key',
  'language',
  'popularity_desc',
  'include_adult',
  'include_video',
]);

moviesReqest
  .then(({ results }) => {
    results.splice(0, 12).forEach((item) => {
      moviesContainer.insertAdjacentHTML('beforeend', renderMovie(item));
    });
  })
  .catch((err) => console.error('Ошибка запроса:', err));
