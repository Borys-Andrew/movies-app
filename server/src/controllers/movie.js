import express from 'express';
import Movie from '../models/movie.js';
import User from '../models/user.js';
import { auth } from '../middleware/auth.js';

export default () => {
  const router = express.Router();
  router.use(auth);

  // get all movies
  router.get('/', async (req, res) => {
    try {
      const result = await Movie.find();

      res.send(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // getById movie
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Movie.findById(id);

      if (!result) {
        return res.status(404).send({ message: 'Movie not found' });
      }

      res.send(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // add movie
  router.post('/', async (req, res) => {
    try {
      const newMovie = {
        ...req.body,
      };

      const data = await Movie.create(newMovie);

      res.status(200).send({
        message: 'Movie was added successfully',
        data,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // edit movie
  router.put('/:id', async (req, res) => {
    try {
      const { id: _id } = req.params;

      const data = await Movie.findOneAndUpdate(
        { _id },
        { ...req.body },
        { new: true },
      );

      res.status(200).send({
        message: 'Movie was updated successfully',
        data,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // remove movie
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Movie.findOneAndDelete(id);

      res.status(200).send({
        message: 'Movie was deleted successfully',
        result,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // add/delete to/from favorite by action
  router.put('/favorite/:id', async (req, res) => {
    try {
      const { id: _id } = req.params;
      const { movieId, action } = req.body;

      let update;
      let message;
      switch (action) {
        case 'add':
          update = { $push: { favorites: movieId } };
          message = 'Movie was added to favorites successfully';
          break;
        case 'remove':
          update = { $pull: { favorites: movieId } };
          message = 'Movie was removed from favorites successfully';
          break;
        default:
          return res.status(400).send({ message: 'Invalid action' });
      }

      const user = await User.findOneAndUpdate({ _id }, update, { new: true });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send({ message, user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // get favorite movies by user
  router.get('/favorite/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select('favorites');

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const ids = user.favorites;

      const favoriteMovies = await Movie.find({
        _id: {
          $in: ids,
        },
      });

      const data = {
        ids,
        favoriteMovies,
      };

      res.status(200).send({ ...data });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  return router;
};
