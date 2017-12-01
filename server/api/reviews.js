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
    console.log(req.body)
    Review.create(req.body)
        .then(review => {
            // console.log('ereaer', review);
            return Review.findAll({
                where: {
                    venueId: req.params.barId
                }
            })
                .then((reviews) => {
                    return Venue.findById(req.params.barId * 1)
                        .then(venue => {
                            console.log('venue', venue)
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
})


module.exports = router;
