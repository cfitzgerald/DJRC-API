const router = require('express').Router();
const db = require('../db/models');
const {User} = db;

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(er => next(er));
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(er => next(er));
});

router.put('/:id', (req, res, next) => {
  User.update(req.body, {  where:  { id:req.params.id } })
    .then(user => res.send(user))
    .catch(er => next(er));
})

router.delete('/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(user => {
      return User.findAll()
        .then(users => res.send(users))
    })
    .catch(er => next(er));
});
