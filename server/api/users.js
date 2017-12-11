const router = require('express').Router();
const db = require('../db/models');
const { User } = db.models;

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    let user;
    User.findById(req.params.id)
        .then((_user) => {
            user = _user;
            user.getVenue()
                .then(venue => res.send({
                    user,
                    venue
                }))
                .catch(next);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(200).send(user))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    const { currentPassword, newPassword, newPasswordCheck } = req.body;
    User.findById(req.params.id)
        .then(user => {
            if (currentPassword) {
                return user.validatePassword(currentPassword)
                    .then(validatedUser => {
                        return validatedUser.checkNewPasswords(newPassword, newPasswordCheck);
                    })
                    .then(authUser => {
                        return user.update(authUser);
                    });
            } else {
                return user.update(req.body);
            }
        })
        .then(updatedUser => res.status(200).send(updatedUser))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            return User.findAll()
                .then(users => res.send(users));
        })
        .catch(next);
});

module.exports = router;
