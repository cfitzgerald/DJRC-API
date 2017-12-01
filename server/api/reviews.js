const express = require('express');
const Review = require('../db/models/Review');
const router = express.Router();

router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => {
            res.send(reviews);
        })
})

router.post('/:barId', (req, res, next) => {
    Review.create(req.body)
        .then(reviews => {
            res.send(reviews);
        })
})


module.exports = router;
