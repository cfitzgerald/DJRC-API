const express = require('express');
const db = require('../db/models/');
const { Venue, Review } = db;
const router = express.Router();

router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => {
            res.send(reviews);
        })
})

router.post('/:barId', (req, res, next) => {
    console.log('bar')
    Review.create(req.body)
        .then(review => {
            return Promise.all([Review.findAll({
                where: {
                    venueId: req.params.barId
                }
            }),
            Venue.findById(req.params.barId)]
            )
                .then(([reviews, venue]) => {
                    let avg = 0;
                    reviews.forEach(review => {
                        avg += Number(review.rating);
                    })
                    avg = avg / reviews.length;
                    console.log(avg);
                    venue.avgRating = avg;
                    venue.save()
                        .then(() => {
                            res.send(review);
                        })

                })
        })
})


module.exports = router;
