const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;
const { DB_CONN } = process.env;
const app = express();
app.use(express.json());

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Переданы некоректные данные ' });
  } else if (err.message === 'NotValid') {
    res.status(404).send({ message: 'не найдено' });
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с переданный email уже существует' });
  } else if (err.statusCode === 5000) {
    res.status(403).send({ message: 'Карточка вам не принадлежит' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'ошибка валидации' }); // validator
  } else if (err.message === 'celebrate request validation failed') {
    res.status(400).send({ message: 'ошибка валидации' }); // joi
  } else if (err.name === 'SyntaxError') {
    res.status(400).send({ message: 'ошибка синтаксиса' });
  } else if (err.message === 'JsonWebTokenError') {
    res.status(403).send({ message: 'Нет доступа' });
  } else if (err.message === 'AuthorizationError') {
    res.status(401).send({ message: 'необходима авторизация' });
  } else if (err.message === 'Неправильные почта или пароль') {
    res.status(401).send({ message: 'Неправильные почта или пароль' });
  } else {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
});

app.listen(PORT, () => {
  console.log('App listening on port 3000');
});
