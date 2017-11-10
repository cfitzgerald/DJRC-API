const router = require('express').Router();
const db = require('../db/models');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { User } = db.models;

router.get('/', (req, res, next) => {
    res.send('sdafsd')
})

router.post('/signup', (req, res, next) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        return res.status(200).send({ user: user.id })
    }).catch(next);
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) next(err);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return;
        }
        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            res.status(200).json({ token });
        }
    })(req, res, next);
})

module.exports = router;