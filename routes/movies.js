const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../middlewares/validator');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/_id', validateMovieId, deleteMovie);

module.exports = router;
