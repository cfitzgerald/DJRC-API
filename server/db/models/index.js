const db = require('./db');
const User = require('./User');
const Venue = require('./Venue');
const Genre = require('./Genre');
const Promo = require('./Promo');
const Song = require('./Song');

Venue.belongsToMany(Genre, { through: 'genreVenue' });
Genre.belongsToMany(Venue, { through: 'genreVenue' });

Venue.belongsToMany(User, { through: 'favorite' });
User.belongsToMany(Venue, { through: 'favorite' });


User.hasOne(Venue)
Song.belongsTo(User);

const sync = () => db.sync();

module.exports = {sync,
  models: {
    Genre,
    User,
    Venue,
    Promo
  }
};
