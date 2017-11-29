const router = require('express').Router();

const db = require('../db/models');

const getSongsFromSpotify = require('../utils/getSongsFromSpotify');
const { Venue } = db.models;


// const Sequelize = require('Sequelize');



module.exports = router;

router.get('/', (req, res, next) => {
  let {latitude, longitude} = req.query;
  latitude *=1 ;
  longitude *=1 ;
  Venue.findAll({ include: [{ all: true }] })
    .then(bars => {
      if (latitude && longitude) {
        bars = bars.filter(bar => {
          return latitude - 0.008 < bar.lat && latitude + 0.008 > bar.lat && longitude - 0.008 < bar.lon && longitude + 0.008 > bar.lon
        })

      }
      bars = bars.map(bar => {
        let genres = [];
        let genreNames = [];
        bar.genres.forEach(genre => {
          genres.push(genre.id)
          genreNames.push(genre.name)
        })
        return {
          id: bar.id,
          lat: bar.lat,
          lon: bar.lon,
          name: bar.name,
          address: bar.address,
          genres: genres,
          owner: bar.Owner,
          genreNames
        }

      })
      return bars
    })
    .then(bars => {
      bars = bars.map(bar => {
        return getSongsFromSpotify(bar);
      })
      return Promise.all(bars)
    })
    .then(bars => {
      res.send(bars)
    })

    .catch(er => next(er));
})

router.get('/:id', (req, res, next) => {
  Venue.findById(req.params.id)
    .then(venue => res.send(venue))
    .catch(next);
});

router.get('/owner/:id', (req, res, next) => {

  Venue.findOne({
    where: {
      userId: req.params.id
    }
  })
    .then(venue => res.send(venue))
    .catch(next);
})

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
  Venue.destroy({ where: { id: req.params.id } })
    .then(venue => {
      return Venue.findAll()
        .then(venues => res.send(venues));
    })
    .catch(next);
});
