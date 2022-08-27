const mongoose = require('mongoose');
const { urlRegex } = require('../utils/urlRegex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Введите название страны'],
  },
  director: {
    type: String,
    required: [true, 'Введите имя режиссёра'],
  },
  duration: {
    type: Number,
    required: [true, 'Введите длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Введите год выпуска'],
  },
  description: {
    type: String,
    required: [true, 'Введите описание фильма'],
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
    required: [true, 'Введите ссылку на постер к фильму'],
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
    required: [true, 'Введите ссылку на трейлер фильма'],
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
    required: [true, 'Введите ссылку на миниатюрное изображение постера к фильму'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Введите название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Введите название фильма на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
