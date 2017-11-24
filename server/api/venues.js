const router = require('express').Router();
const db = require('../db/models');
const { Venue } = db.models;

module.exports = router;

router.get('/', (req, res, next) => {
  Venue.findAll({ include: [{ all: true }] })
    .then(bars => {
      bars = bars.map(bar => {
          let genres = [];
          let genreNames = [];
          bar.genres.forEach(genre => {
              genres.push(genre.id)
              genreNames.push(genre.name)
          })
          return {
              id: bar.id,
              lat: bar.lat,
              lon: bar.lon,
              name: bar.name,
              address: bar.address,
              genres: genres,
              genreNames
          }
      })
      res.send(bars)
    })
    .catch(er => next(er));
});

router.get('/:id', (req, res, next) => {
  Venue.findById(req.params.id)
    .then(venue => res.send(venue))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Venue.create(req.body)
    .then(() => {
      return Venue.findAll()
        .then(venues => res.send(venues));
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  // Venue.update(req.body, { where: { id: req.params.id } })
  //   .then(venue => res.send(venue))
  //   .catch(er => next(er))

  Venue.updateOwner(req.params.id, req.body.userId)
  .then(() => res.sendStatus(200))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Venue.destroy({ where: { id: req.params.id } })
    .then(venue => {
      return Venue.findAll()
        .then(venues => res.send(venues));
    })
    .catch(next);
});
