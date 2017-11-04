const router = require('express').Router();
const db = require('../db/models');
const {Genre} = db;

module.exports = router;

router.get('/', (req, res, next) => {
  Genre.findAll()
    .then(genres => res.send(genres))
    .catch(er => next(er));
});

router.get('/:id', (req, res, next) => {
  Genre.findById(req.params.id)
    .then(genre => res.send(genre))
    .catch(er => next(er));
});

router.post('/', (req, res, next) => {
  Genre.create(req.body)
    .then(genre => res.send(genre))
    .catch(er => next(er));
});

router.delete('/:id', (req, res, next) => {
  Genre.destroy({ where: { id: req.params.id } })
    .then(genre => {
      return Genre.findAll()
        .then(genres => res.send(genres))
    })
    .catch(er => next(er));
});
