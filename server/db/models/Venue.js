const db = require('./db');
const Sequelize = db.Sequelize;

const Op = Sequelize.Op;

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

Venue.updateOwner = function (venueId, userId) {
    Venue.findById(venueId)
        .then((venue) => {

            venue.setOwner(userId)
            return venue.save()
        })
}


Venue.spotify = function () {
    return Venue.findAll({
        where: {
            OwnerId: {
                [Op.gt]: 0
            }
        }
    })

}


module.exports = Venue;
