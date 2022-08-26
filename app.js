const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errors');
const cors = require('./middlewares/cors');
const limiter = require('./utils/rateLimiter');
const { PORT, MONGO_LINK } = require('./utils/envConfiguration');

mongoose.connect(MONGO_LINK, {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use(routes);

app.use(limiter);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler); // обработчик ошибок

app.use(errors()); // обработчик ошибок celebrate

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
