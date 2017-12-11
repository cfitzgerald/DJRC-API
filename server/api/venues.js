const router = require('express').Router();
const db = require('../db/models');
const getSongsFromSpotify = require('../utils/getSongsFromSpotify');
const { Venue } = db.models;

router.get('/', (req, res, next) => {
    let { latitude, longitude, radius } = req.query;
    latitude *= 1;
    longitude *= 1;
    radius *= 1;
    radius = radius ? radius : 0.008;
    Venue.findAll({
            include: [{
                all: true
            }]
        })
        .then(bars => {
            if (latitude && longitude) {
                bars = bars.filter(bar => {
                    return latitude - radius < bar.lat && latitude + radius > bar.lat && longitude - radius < bar.lon && longitude + radius > bar.lon;
                });
            }
            bars = bars.map(bar => {
                return bar.getUser()
                    .then(user => {
                        let genres = [];
                        let genreNames = [];
                        let promos = [];
                        bar.genres.forEach(genre => {
                            genres.push(genre.id);
                            genreNames.push(genre.name);
                        });
                        bar.promos.forEach(promo => {
                            promos.push(promo.description);
                        });
                        return {
                            id: bar.id,
                            lat: bar.lat,
                            lon: bar.lon,
                            name: bar.name,
                            address: bar.address,
                            genres: genres,
                            owner: user,
                            avgRating: bar.avgRating,
                            genreNames,
                            promos
                        };
                    });

            });
            return Promise.all(bars);
        })
        .then(bars => {
            bars = bars.map(bar => {
                return getSongsFromSpotify(bar);
            });
            return Promise.all(bars);
        })
        .then(bars => {
            res.send(bars);
        })
    .catch(er => next(er));
});

router.get('/:id', (req, res, next) => {
    Venue.findById(req.params.id)
        .then(venue => res.send(venue))
        .catch(next);
});

router.get('/owner/:id', (req, res, next) => {
    Venue.findOne({
            where: {
                userId: req.params.id
            },
            include: [{
                all: true
            }]
        })
        .then(venue => {
            res.send(venue);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    Venue.create(req.body)
        .then(() => {
            return Venue.findAll()
                .then(venues => res.send(venues));
        })
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Venue.updateGenres(req.params.id, req.body)
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.put('/owner/:id', (req, res, next) => {
    Venue.updateOwner(req.params.id, req.body.userId)
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Venue.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(venue => {
            return Venue.findAll()
                .then(venues => res.send(venues));
        })
        .catch(next);
});

module.exports = router;
