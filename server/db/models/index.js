
const db = require('./db');
const User = require('./User');
const Venue = require('./Venue');
const Genre = require('./Genre');
const Promo = require('./Promo');
const Song = require('./Song');
const Review = require('./Review');

Venue.belongsToMany(Genre, { through: 'genreVenue' });
Genre.belongsToMany(Venue, { through: 'genreVenue' });

Venue.belongsToMany(User, { through: 'favorite' });
User.belongsToMany(Venue, { through: 'favorite' });

Review.belongsTo(User)
Review.belongsTo(Venue)
Venue.belongsTo(User)

Song.belongsTo(User);

Promo.belongsTo(Venue);
Venue.hasMany(Promo);

const sync = () => db.sync();

module.exports = {sync,
  models: {
    Genre,
    User,
    Venue,
    Promo,
    Song,
    Review
  }
};