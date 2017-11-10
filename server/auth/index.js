const router = require('express').Router();
const db = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = db.models;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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
                // return done(null, user);

                if (user) {
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

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    console.log('asdfsad');
    User.findById(payload.id)
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

router.get('/protected', function (req, res, next) {
    passport.authenticate('jwt', (err, user) => {

        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        if (user) {
            return res
                .status(200)
                .json({ secret: '123' });
        }
    })(req, res, next);
});

router.post('/login', (req, res, next) => {

})

router.post('/signup', (req, res, next) => {

})

router.post('/logout', (req, res, next) => {

})

module.exports = router;
