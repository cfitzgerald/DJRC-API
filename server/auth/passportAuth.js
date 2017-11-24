const router = require('express').Router();
const db = require('../db/models');
const jwt = require('jsonwebtoken');
const passport = require('passport');
var SpotifyWebApi = require('spotify-web-api-node');

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
            res.status(200).json({ user, token });
        }
    })(req, res, next);
})

router.all('/getUser', (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err) console.log(err);
        res.status(200).json(user);
    })(req, res, next)
});

router.get('/spotify', passport.authenticate('spotify',
    { scope: ['user-read-currently-playing', 'streaming', 'user-read-email', 'user-read-recently-played'], session: false }), (req, res, next) => {
        next();
    });

router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/', session: false }),
    (req, res) => {
        const token = jwt.sign({ spotifyId: req.user.id, spotifyAccessToken: req.user.spotifyAccessToken }, process.env.JWT_SECRET)
        const spotifyApi = new SpotifyWebApi;
        spotifyApi.setAccessToken(req.user.spotifyAccessToken)
        spotifyApi.getMyRecentlyPlayedTracks()
            .then(data => {
            const songs = [];
            data.body.items.forEach(song => {
                const track = {};
                track.artist = song.track.artists[0].name;
                track.song = song.track.name;
                songs.push(track);
            })
                res.redirect(`exp://ru-ex3.jdb409.djrc-native.exp.direct:80/+token=${token}`);
            }).catch(err => {
                console.log(err)
            })
    });


module.exports = router;
