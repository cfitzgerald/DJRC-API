const express = require('express');
const router = express.Router();
const Review = require('../db/models/Review');
const Venue = require('../db/models/Venue');

router.get('/:barId', (req, res, next) => {
    Review.findAll({
            where: {
                venueId: req.params.barId
            }
        })
        .then(reviews => {
            res.send(reviews);
        });
});

router.post('/:barId', (req, res, next) => {
    Review.create(req.body)
        .then(review => {
            return Promise.all([Review.findAll({
                    where: {
                        venueId: req.params.barId
                    }
                }), Venue.findById(req.params.barId * 1)])
                .then(([reviews, venue]) => {
                    let avg = 0;
                    reviews.forEach(review => {
                        avg += Number(review.rating);
                    });
                    avg = avg / reviews.length;
                    venue.avgRating = avg;
                    venue.save()
                        .then(() => {
                            res.send(review);
                        });
                });


        });
});

module.exports = router;
