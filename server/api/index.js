const api = require('express').Router();

api.use('/auth', require('./auth'));
api.use('/genres', require('./genres'));
api.use('/promos', require('./promos'));
api.use('/users', require('./users'));
api.use('/venues', require('./venues'));

api.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

module.exports = api;
