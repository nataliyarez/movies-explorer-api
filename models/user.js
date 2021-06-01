const isEmail = require('validator/lib/isEmail')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, // имя — это строка
        minlength: 2, // минимальная длина имени — 2 символа
        maxlength: 30, // а максимальная — 30 символов
        required: true,
    },
    email: {
        type: String,
        required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
        unique: true, // отвечает за уникальность email
        validate: {
            validator: (v) => isEmail(v),
            message: 'Неправильный формат почты',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },

})

module.exports = mongoose.model('user', userSchema)
