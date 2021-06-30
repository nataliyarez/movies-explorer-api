const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { check } = require('express-validator');
const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const routes = express.Router();



routes.use('/users', auth, usersRouter);
routes.use('/movies', auth, moviesRouter);
routes.post('/signup', [check('email').normalizeEmail()], celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
routes.use('/', auth);

routes.all('*', (req, res, next) => {
  next(new Error('NotValid'));
});

exports.routes = routes;
