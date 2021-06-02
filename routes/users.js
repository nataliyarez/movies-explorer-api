const usersRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')

const {
    updateUserName, getUser,
} = require('../controllers/users')

usersRouter.get('/me', getUser) // возвращает информацию о текущем пользователе

usersRouter.patch('/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().required().email(),
    }),
}), updateUserName) // обновлание имяни и email

exports.usersRouter = usersRouter
