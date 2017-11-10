const express = require('express');
const path = require('path');
const app = express();
const sync = require('./db/models/').sync;
const port = process.env.PORT || 3002;
const bodyParser = require('body-parser');
<<<<<<< HEAD
const passport = require('passport');
const passportJwt = require('passport-jwt');

//env variables
app.use(require('dotenv').config());

app.use(passport.initialize());

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new passportJwt.Strategy(jwtOptions, (payLoad, done) => {
    
=======
const session = require('express-session');

app.use(session({
  secret: 'haha yes',
  resave: false,
  saveUninitialized: false, // https://github.com/expressjs/session#options
>>>>>>> master
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/vendor', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));


app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  res.send(err);
});

sync()
<<<<<<< HEAD
    .then(() => {
        console.log('synced');
        app.listen(port, () => {
            console.log(`DJRC listening on ${port}`);
        });
    })
=======
  .then(() => {
    console.log('synced');
    app.listen(port, () => {
      console.log(`DJRC listening on ${port}`);
    });
  });
>>>>>>> master
