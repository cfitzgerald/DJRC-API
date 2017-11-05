const router = require('express').Router();
const db = require('../db/models');
const {Venue} = db;

module.exports = router;

router.get('/', (req, res, next) => {
  Venue.findAll()
    .then(venues => res.send(venues))
    .catch(er => next(er));
});

router.get('/:id', (req, res, next) => {
  Venue.findById(req.params.id)
    .then(venue => res.send(venue))
    .catch(er => next(er));
});

router.post('/', (req, res, next) => {
  Venue.create(req.body)
    .then(() => {
      return Venue.findAll()
        .then(venues=> res.send(venues))
    })
    .catch(er => next(er));
});

router.put('/:id', (req, res, next) => {
  Venue.update(req.body, { where: { id: req.params.id } })
    .then(venue => res.send(venue))
    .catch(er => next(er))
});

router.delete('/:id', (req, res, next) => {
  Venue.destroy({ where: { id: req.params.id } })
    .then(venue => {
      return Venue.findAll()
        .then(venues => res.send(venues))
    })
    .catch(er => next(er));
});
