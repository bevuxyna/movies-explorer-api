const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const { CREATED } = require('../utils/status');
const {
  MOVIE_NOT_FOUND,
  MOVIE_INVALID_DATA,
  MOVIE_FORBIDDEN_DELETE,
  UNAUTHORIZED,
} = require('../utils/statusMessage');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MOVIE_INVALID_DATA));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_DELETE);
      }
      return Movie.remove(movie);
    })
    .then(() => res.status(200).send({ message: 'Успешно' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(UNAUTHORIZED));
        return;
      }
      next(err);
    });
};
