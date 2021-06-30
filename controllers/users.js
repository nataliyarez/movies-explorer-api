const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getUser = (req, res, next) => { // возвращает пользователей по ID
  User.findById(req.user._id)
    .orFail(new Error('NotValid'))
    .then((user) => res.send(user))
    .catch(next);
};

exports.createUser = (req, res, next) => { // создает пользователя
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

exports.updateUserName = (req, res, next) => { // обновление данных пользователя
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, email: req.body.email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением

    })
    .orFail(new Error('NotValid'))
    .then((user) => res.send(user))
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      return res.status(200).send({ token });
    })
    .catch(next);
};
