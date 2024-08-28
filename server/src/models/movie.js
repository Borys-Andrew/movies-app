import { Schema, model } from 'mongoose';

const movieSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isFavorite: {
    type: Boolean,
    required: false,
  },
});

const Movie = model('Movie', movieSchema);

export default Movie;
