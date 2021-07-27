import '../assets/scss/style.scss';
import { requestTMD, renderMovie } from './module/request';

const moviesContainer = document.querySelector('.movies');
const paginationContainer = document.querySelector('.pagination-nav');
const page = window.location.search.slice(1);
const portionSize = 5;
const pageAll = 15;

let moviesReqest = requestTMD(
  [
    'discover_movie',
    'api_key',
    'language',
    'popularity_desc',
    'include_adult',
    'include_video',
  ],
  null,
  page
);

moviesReqest
  .then(({ results }) => {
    results.forEach((item) => {
      moviesContainer.insertAdjacentHTML('beforeend', renderMovie(item));
    });
  })
  .catch((err) => console.error('Ошибка запроса:', err));

const createLinkPaginator = (link) => {
  return `<a href='movies.html?page=${link}' class='nav-link ${
    page.slice(5) == link ? 'active' : 'a'
  }'>${link}</a>`;
};

const createPaginator = (page) => {
  let pagesList = [];
  for (let i = 1; i <= pageAll; i++) {
    pagesList.push(i);
  }

  let portionNumber = Math.ceil(page / portionSize);
  let leftPortion = (portionNumber - 1) * portionSize + 1;
  let rigthPortion = portionNumber * portionSize;
  let beforeSpan = `<a href='movies.html?page=${
    leftPortion - 1
  }' class='nav-link'>Before</a>`;
  let afterSpan = `<a href='movies.html?page=${
    rigthPortion + 1
  }' class='nav-link'>After</a>`;

  return ` ${portionNumber === 1 ? '<span>Before</span>' : beforeSpan}
          ${pagesList
            .filter((p) => p >= leftPortion && p <= rigthPortion)
            .map((p) => createLinkPaginator(p))
            .join('')}
          ${
            portionNumber === pageAll / portionSize
              ? '<span>After</span>'
              : afterSpan
          }`;
};

paginationContainer.insertAdjacentHTML(
  'beforeend',
  createPaginator(page.slice(5))
);
