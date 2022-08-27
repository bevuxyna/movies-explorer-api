const mongoose = require('mongoose');
const validator = require('validator');
const { compare } = require('bcrypt');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите имя пользователя'],
    minlength: [2, 'Текст должен быть не короче 2 символов'],
    maxlength: [30, 'Текст должен быть короче 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Ошибка авторизации');
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Ошибка авторизации');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
