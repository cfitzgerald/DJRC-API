const router = require('express').Router();
const db = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = db.models;

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
                done(err);
            })
    }
));

passport.use('jwt', new JwtStrategy(jwtOptions, (payload, done) => {
    const id = payload.spotifyId ? 'spotifyId' : 'id';
    const load = payload.spotifyId ? payload.spotifyId : payload.id;

    console.log('id', id);
    User.findOne({
        where: {
            id: load
        }
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
    console.log('asdfsd');
    User.findOrCreate({
        where: {
            spotifyId: profile.id
        }
    })
        .then(([user]) => {
            user.spotifyAccessToken = accessToken;
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
