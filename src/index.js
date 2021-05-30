import './assets/scss/style.scss';

const moviesContainer = document.querySelector('.movies');

let URLImg = 'https://image.tmdb.org/t/p/w500';

const renderMovie = (movie) => {
  return `<div class="movies-item"> 
            <a class="movies__link" href="movie.html?id=${movie['id']}">
              <h3 class="movies__title">${movie.title}</h3>
              <div class="movies__img">
                <img src="${URLImg + movie['backdrop_path']}" alt="${
    movie.title
  }">
                <div class="movies__info active-link"> 
                  <span class="movies__info-year">${
                    movie['release_date']
                  }</span>
                  <span class="movies__info-rating rating">${
                    movie['vote_average']
                  }</span>
                  <p class="movies__info-overview">${movie.overview}</p>
                </div>
              </div>              
            </a>
          </div>`;
};

let a = new Promise((resolve, reject) => {
  fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=6e6736e6ab781fd3a1a7c3b7add7654b&language=en_US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
  ).then((data) => {
    resolve(data.text());
  });
});

a.then((data) => {
  let response = JSON.parse(data).results;
  response.forEach((item) => {
    moviesContainer.insertAdjacentHTML('beforeend', renderMovie(item));
  });
});

// popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
