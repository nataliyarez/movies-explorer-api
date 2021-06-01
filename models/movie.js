const mongoose = require('mongoose')
const isURL = require('validator/lib/isURL')

const cardSchema = new mongoose.Schema({

    country: { // country — страна создания фильма.
        type: String, // имя — это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        minlength: 2, // минимальная длина имени — 2 символа
        maxlength: 30, // а максимальная — 30 символов
    },
    director: { // director — режиссёр фильма.
        type: String, // имя — это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        minlength: 2, // минимальная длина имени — 2 символа
        maxlength: 30, // а максимальная — 30 символов
    },
    year: { // year — год выпуска фильма.
        type: String, // имя — это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        minlength: 4, // минимальная длина имени — 2 символа
        maxlength: 4, // а максимальная — 4 символов
    },
    description: { // description — описание фильма.
        type: String, // имя — это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        minlength: 2, // минимальная длина имени — 2 символа

    },
    image: { // image — ссылка на постер к фильму.
        type: String, // это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        validate: {
            validator: (value) => isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
            message: 'Неправильный формат URL',
        },

    },
    trailer: { // trailer — ссылка на трейлер фильма.
        type: String, // это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        validate: {
            validator: (value) => isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
            message: 'Неправильный формат URL',
        },

    },
    thumbnail: { // thumbnail — миниатюрное изображение постера к фильму.
        type: String, // это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        validate: {
            validator: (value) => isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
            message: 'Неправильный формат URL',
        },

    },

    owner: { // owner — _id пользователя, который сохранил фильм.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    movieId: { // movieId — _id фильма, который содержится в ответе сервиса MoviesExplorer.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    nameRU: { // nameRU — название фильма на русском языке.
        type: String, // имя — это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        minlength: 2, // минимальная длина имени — 2 символа
    },
    nameEN: { // nameEN — название фильма на английском языке.
        type: String, // имя — это строка
        required: true, // оно должно быть у каждого пользователя, так что  — обязательное поле
        minlength: 2, // минимальная длина имени — 2 символа
    },
})

module.exports = mongoose.model('card', cardSchema)
