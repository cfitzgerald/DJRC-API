const router = require('express').Router();
const db = require('../db/models');
var SpotifyWebApi = require('spotify-web-api-node');
const { Venue, User } = db.models;


module.exports = router;

const getSongsFromSpotify = (bar) => {
  return new Promise((resolve, reject) => {
    if (!bar.owner || !bar.owner.spotifyAccessToken) {
      return resolve(bar);
    }
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(bar.owner.spotifyAccessToken);
    spotifyApi.setRefreshToken(bar.owner.spotifyRefreshToken);
    spotifyApi.getMyRecentlyPlayedTracks()
      .then(data => {
        bar.currentSong = data.body.items[0].track.name;
        return resolve(bar);
      })
      .catch(err => {
        spotifyApi.refreshAccessToken()
          .then(function (data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            return User.findById(bar.owner.id)
            .then(user => {
              user.spotifyAccessToken = data.body['access_token']
              user.save();
            })
            .then(() => {
              getSongsFromSpotify(bar);
            })
          })
      })
  })
}

router.get('/', (req, res, next) => {
  Venue.findAll({ include: [{ all: true }] })
    .then(bars => {
      bars = bars.map(bar => {
        let genres = [];
        let genreNames = [];
        bar.genres.forEach(genre => {
          genres.push(genre.id)
          genreNames.push(genre.name)
        })
        // if (bar.Owner) console.log('hello', bar.Owner.spotifyRefreshToken);
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
});


router.get('/:id', (req, res, next) => {
  Venue.findById(req.params.id)
    .then(venue => res.send(venue))
    .catch(er => next(er));
});

router.post('/', (req, res, next) => {
  Venue.create(req.body)
    .then(() => {
      return Venue.findAll()
        .then(venues => res.send(venues))
    })
    .catch(er => next(er));
});

router.put('/:id', (req, res, next) => {
  // Venue.update(req.body, { where: { id: req.params.id } })
  //   .then(venue => res.send(venue))
  //   .catch(er => next(er))

  Venue.updateOwner(req.params.id, req.body.userId)
    .then(() => res.sendStatus(200))
    .catch(er => next(er))
});

router.delete('/:id', (req, res, next) => {
  Venue.destroy({ where: { id: req.params.id } })
    .then(venue => {
      return Venue.findAll()
        .then(venues => res.send(venues))
    })
    .catch(er => next(er));
});
