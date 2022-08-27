const USER_NOT_FOUND = 'Нет пользователя с таким id';

const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';

const USER_CONFLICT_ERROR = 'Пользователь с таким email уже существует';

const USER_INVALID_DATA = 'Переданы некорректные данные при создании пользователя';

const USER_INVALID_UPDATEDATA = 'Переданы некорректные данные при обновлении пользователя';

const MOVIE_INVALID_DATA = 'Переданы некорректные данные при создании фильма';

const MOVIE_FORBIDDEN_DELETE = 'Недостаточно прав для удаления фильма';

const ID_INVALID = 'Невалидный id';

const UNAUTHORIZED = 'Необходима авторизация';

const SERVER_ERROR = 'На сервере произошла ошибка';

const VALIDATION_ERROR = 'ValidationError';

const CAST_ERROR = 'CastError';

const SUCCESS = 'Успешно';

module.exports = {
  USER_NOT_FOUND,
  MOVIE_NOT_FOUND,
  USER_CONFLICT_ERROR,
  USER_INVALID_DATA,
  MOVIE_INVALID_DATA,
  MOVIE_FORBIDDEN_DELETE,
  USER_INVALID_UPDATEDATA,
  ID_INVALID,
  UNAUTHORIZED,
  SERVER_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
  SUCCESS,
};
