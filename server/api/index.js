const api = require('express').Router();


api.use('/genres', require('./genres'));
// api.use('/promos', require('./promos'));
api.use('/users', require('./users'));
api.use('/venues', require('./venues'));

api.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

api.get('/', (req, res, next) => {
  res.send('api page')
})

module.exports = api;
