const router = require('express').Router();
const db = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = db.models;
const { Venue } = db.models;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
},
    function (username, password, done) {
        User.findOne({
            where: {
                email: username
            }
        })
            .then(user => {

                if (!user) {
                    done(null, false);
                }
                if (user) {
                    //for some reason user.validate password wasn't working
                    bcrypt.compare(password, user.password)
                        .then(res => {

                            if (!res) {
                                return done(null);
                            }
                            return done(null, user);
                        }).catch(err => {
                            console.log(err);
                        })
                }
            }).catch(err => {
                console.log('err', err)
                done(err);
            })
    }
));

passport.use('jwt', new JwtStrategy(jwtOptions, (payload, done) => {
    const id = payload.spotifyId ? 'spotifyId' : 'id';
    const load = payload.spotifyId ? payload.spotifyId : payload.id;

    User.findOne({
        where: {
            id: load
            },
            include: [{ all: true }]

    })
        .then(user => {
            if (user) {
                done(null, user)
            } else {
                done(null, false);
            }
        }).catch(err => {
            done(err);
        })

}));

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENTID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({
        where: {
            spotifyId: profile.id
        }
    })
        .then(user => {
            return user ? user :
                User.create({ spotifyId: profile.id })
        })
        .then(user => {
            user.email = profile._json.email;
            user.spotifyAccessToken = accessToken;
            user.spotifyRefreshToken = refreshToken;
            return user.save();
        })
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log(err);
        })
}
))

module.exports = router;
