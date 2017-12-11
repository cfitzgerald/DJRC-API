const db = require('./db');
const Sequelize = db.Sequelize;
const User = require('./User');

const Venue = db.define('venue', {
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    type: {
        type: Sequelize.STRING
    },
    vibe: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    },
    lat: {
        type: Sequelize.FLOAT
    },
    lon: {
        type: Sequelize.FLOAT
    },
    avgRating: {
        type: Sequelize.STRING
    }
});

Venue.updateOwner = function(venueId, userId) {
    Venue.findById(venueId)
        .then((venue) => {
            venue.setUser(userId);
            return venue.save();
        })
        .then(() => {
            User.findById(userId)
                .then((user) => {
                    // user.setVenue(venueId);
                    user.isBusiness = true;
                    return user.save();
                });
        });
};

Venue.updateGenres = function(venueId, genreArr) {
    Venue.findById(venueId)
        .then((venue) => {
            venue.setGenres(genreArr);
            return venue.save();
        });
};

module.exports = Venue;
