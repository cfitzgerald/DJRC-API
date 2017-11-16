const db = require('./db');
const Sequelize = db.Sequelize;

const Song = db.define('song', {
    artist: {
        type: Sequelize.STRING
    },
    track: {
        type: Sequelize.STRING
    }
});

module.exports = Song;
