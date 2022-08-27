require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const { CREATED } = require('../utils/status');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  USER_NOT_FOUND,
  USER_CONFLICT_ERROR,
  USER_INVALID_DATA,
  USER_INVALID_UPDATEDATA,
  VALIDATION_ERROR,
} = require('../utils/statusMessage');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => {
      res.status(CREATED).send({
        name: data.name,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_ERROR));
        return;
      }

      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(USER_INVALID_DATA));
        return;
      }

      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_ERROR));
        return;
      }

      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(USER_INVALID_UPDATEDATA));
        return;
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
