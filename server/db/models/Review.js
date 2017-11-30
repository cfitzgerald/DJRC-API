const db = require('./db');
const Sequelize = db.Sequelize;

const Review = db.define('review', {
    rating: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.TEXT
    },
    genre: {
        type: Sequelize.STRING
    }
});

module.exports = Review;
