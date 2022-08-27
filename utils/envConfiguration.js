const {
  MONGO_LINK = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV, PORT, JWT_SECRET, MONGO_LINK,
};
