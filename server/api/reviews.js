const express = require('express');
const Review = require('../db/models/Review');
const Venue = require('../db/models/Venue');
// const { Venue } = db;
const router = express.Router();

router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => {
            res.send(reviews);
        })
})

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
                    })
                    avg = avg / reviews.length;
                    venue.avgRating = avg;
                    venue.save()
                        .then(() => {
                            res.send(review);
                        })
                })


        })
})


module.exports = router;
