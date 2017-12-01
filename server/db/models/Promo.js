const db = require('./db');
const Sequelize = db.Sequelize;

const Promo = db.define('promo', {
    description: {
        type: Sequelize.STRING
    }
});

module.exports = Promo;
