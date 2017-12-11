const router = require('express').Router();
const db = require('../db/models');
const { Promo } = db.models;
const { Venue } = db.models;

router.get('/', (req, res, next) => {
    Promo.findAll()
        .then(promos => res.send(promos))
        .catch(next);
});

router.get('/:venueId', (req, res, next) => {
    Promo.findAll({
            where: {
                venueId: req.params.venueId
            }
        })
        .then(promos => {
            res.send(promos);
        })
        .catch(console.log('venueId error'));
});

router.delete('/:id', (req, res, next) => {
    Promo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.sendStatus(200));
});

router.post('/:id', (req, res, next) => {
    let promo;
    let curPromos = [];
    Promo.create(req.body)
        .then(_promo => {
            promo = _promo;
            Venue.findById(req.params.id)
                .then(venue => {
                    venue.getPromos()
                        .then(promos => {
                            curPromos = promos;
                            curPromos.push(promo);
                            venue.setPromos(curPromos)
                                .then(updatedVenue => {
                                    updatedVenue.save();
                                });
                        })
                        .catch(console.log('err'));
                })
                .catch(console.log('err'));
            return res.status(200).send(promo);
        });
});

module.exports = router;
