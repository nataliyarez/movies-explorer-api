const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const UserError = require('../errors/user-error');

exports.getMovies = (req, res, next) => { //  возвращает все фильмы пользователя
  Movie.find({ owner: req.user._id })
    .populate('user')
    .orFail(new Error('NotValid'))
    .then((movie) => res.send(movie))
    .catch(next);
};

exports.deleteMovie = (req, res, next) => { // удаляет фильм по идентификатору
  Movie.findById(req.params._id)
    .then((movies) => {
      if (movies === undefined) {
        throw new NotFoundError('NotValid');
      } else if (movies.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params._id)
          .then((movie) => res.send(movie))
          .catch(next);
      } else {
        throw new UserError('Карточка вам не принадлежит');
      }
    })
    .catch(next);
};

exports.createMovies = (req, res, next) => { // создаёт фильм
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};
