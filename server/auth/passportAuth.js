const router = require('express').Router();
const db = require('../db/models');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { User } = db.models;

router.get('/', (req, res, next) => {
    res.send('passportAuth: get');
});

//Create a new user
router.post('/signup', (req, res, next) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        return res.status(200).send({
            user: user.id
        });
    }).catch(next);
});

//Try to log user in
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) next(err);
        if (!user) {
            res.status(401).json({
                error: 'Invalid credentials.'
            });
            return;
        }
        if (user) {
            //create jwt if user is valid
            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET);
            res.status(200).json({
                user,
                token
            });
        }
    })(req, res, next);
});

//Persist a user
router.all('/getUser', (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err) console.log(err);
        res.status(200).json(user);
    })(req, res, next);
});

//Use oAuth to log a user in with Spotify and get access to recently played music.
router.get('/spotify', passport.authenticate('spotify', {
    scope: ['user-read-currently-playing', 'streaming', 'user-read-email', 'user-read-recently-played'],
    session: false
}), (req, res, next) => {
    next();
});

//Create a jwt and send it to frontend if oAuth is successful.
router.get('/spotify/callback', passport.authenticate('spotify', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        const token = jwt.sign({
            spotifyId: req.user.id,
            spotifyAccessToken: req.user.spotifyAccessToken
        }, process.env.JWT_SECRET);

        res.redirect(`exp://exp.host/@jdb409/Capstone/+token=${token}`);
    });

module.exports = router;
