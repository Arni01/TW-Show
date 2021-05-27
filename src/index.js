import './assets/scss/style.scss';

const movies = document.querySelector('.movies').children;

let item = movies[0].querySelector('.movies__img');

let a = new Promise((resolve, reject) => {
  fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=6e6736e6ab781fd3a1a7c3b7add7654b&language=ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
  ).then((data) => {
    resolve(data.text());
  });
});

a.then((data) => {
  console.log(JSON.parse(data).results);
  let response = JSON.parse(data).results;
  let image = response[0].backdrop_path;
  console.log(image);
  item.src = 'https://image.tmdb.org/t/p/w500' + image;
});

// console.log(a[0].backdrop_path);
// item.src = 'https://image.tmdb.org/t/p/w500';

// popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
