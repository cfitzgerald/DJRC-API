const db = require('./db');
const Sequelize = db.Sequelize;

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
    }
});

Venue.UpdateOwner = function(venueId, userId){
    Venue.findById(venueId)
    .then((venue) => {
        venue.setUser(userId)
        return venue.save()
    })
}

module.exports = Venue;
