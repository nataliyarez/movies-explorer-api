const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, deleteMovie, createMovies,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies); // возвращает все сохранённые пользователем фильмы
moviesRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().min(24)
      .max(24),
  }),
}), deleteMovie); // удаляет фильм по идентификатору
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp('^(http[s]?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})\\/?.*?$')),
    trailer: Joi.string().required().pattern(new RegExp('^(http[s]?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})\\/?.*?$')),
    thumbnail: Joi.string().required().pattern(new RegExp('^(http[s]?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})\\/?.*?$')),
    movieId: Joi.number().required(),
    nameRU: Joi.string().regex(/^[. а-яА-Я0-9]+$/).required().min(2),
    nameEN: Joi.string().regex(/^[. a-zA-Z0-9]+$/).required().min(2),

  }),
}), createMovies); // создаёт фильм

exports.moviesRouter = moviesRouter;
