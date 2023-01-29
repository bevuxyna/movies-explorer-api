
# Movies Explorer

Репозиторий для API Movies Explorer - сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете. Проект был реализован в рамках дипломной работы на платформе Яндекс.Практикум.


## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp;
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)&nbsp;

## Demo

API доступен по адресу:
https://api.bevuxynadiploma.nomoredomains.sbs

## Features

- Все роуты, кроме аутентификации и авторизации, защищены авторизацией.
- Настроено логгирование (запросы и ответы записываются в `request.log`, ошибки записываются в `error.log`).
- Данные, которые приходят в теле и параметрах запроса, валидируются.
- Ошибки обрабатываются централизованным обработчиком.
- Для ошибок API созданы классы, расширяющие конструктор `Error`.
- Реализовано бережное хранение пароля (пароль хранится в виде хеша, API не возвращает хеш пароля клиенту)


## API Reference

Создание пользователя с переданными в теле
email, password и name

```
  POST /signup
```

Проверка переданных в теле почты и пароля
и возвращение JWT

```
  POST /signin
```

Получение информации о пользователе (email и имя)

```
  GET /users/me
```

Обновление информации о пользователе (email и имя)

```
  PATCH /users/me
```

Получение всех фильмов, сохранённых текущим  пользователем

```
  GET /movies
```

Создание фильма с переданными в теле
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

```
  POST /movies
```

Удаление сохранённого фильма по id

```
  DELETE /movies/_id 
```

## Run Locally

Клонировать репозиторий:

```
  gh repo clone bevuxyna/movies-explorer-api
```

Установить зависимости:

```
  npm install
```

Запустить сервер на `localhost:3000`:

```
  npm run start
```

Запустить сервер на `localhost:3000` с hot-reload:

```
  npm run dev
```
## Guidelines for the project

[Чек лист](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html) для проверки дипломного проекта.

Сторонний API [BeatfilmMoviesApi](https://api.nomoreparties.co/beatfilm-movies)
