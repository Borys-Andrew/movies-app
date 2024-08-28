import fetch from 'node-fetch';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Movie from './../src/models/movie.js';
dotenv.config();

const PAGES = 4;

const { MOVIE_BEARER_TOKEN, MOVIE_API_KEY, DB_HOST } = process.env;
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${MOVIE_BEARER_TOKEN}`,
  },
};

const GENRE = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const getCastsWithDirector = async (movieId) => {
  const castsUrl = `${MOVIE_BASE_URL}movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`;

  const data = await fetch(castsUrl, OPTIONS).then((res) => res.json());

  const director = data.crew.find((el) => el.job === 'Director').name;
  const actors = data.cast.map(({ name }) => name).slice(0, 8);

  return { director, actors };
};

const getMovie = async (page) => {
  const url = `${MOVIE_BASE_URL}trending/movie/week?page=${page}`;

  const data = await fetch(url, OPTIONS)
    .then((res) => res.json())
    .then((data) => {
      return Promise.all(
        data.results.map(async (movie) => {
          const {
            id,
            title,
            overview,
            genre_ids,
            release_date,
            vote_average,
            poster_path,
            backdrop_path,
          } = movie;

          const { actors, director } = await getCastsWithDirector(id);

          const genre = genre_ids.map((el) => GENRE[el]);
          const rating = +vote_average.toFixed(1);

          return {
            // id,
            title,
            image: IMAGE_BASE_URL + poster_path || backdrop_path,
            director,
            actors: [...actors],
            genre,
            isFavorite: false,
            rating,
            releaseDate: release_date,
            description: overview,
          };
        }),
      );
    })
    .catch((err) => console.error('error:' + err));

  return data;
};

const main = async () => {
  // Fetch movies from API
  const movies = [];

  for (let i = 1; i <= PAGES; i++) {
    const pageData = await getMovie(i);

    movies.push(...pageData);
  }

  // run DB conection => save movies to DB => close DB connection
  await mongoose
    .connect(DB_HOST)
    .then(() => console.log('DB conected successfully'))
    .then(() => Movie.insertMany(movies))
    .then(() => console.log('Movies saved successfully'))
    .catch((error) => console.log(error.message))
    .finally(() => mongoose.connection.close());

  console.log('Seeded...');
  console.log(movies.length);
};

main();
