const router = require('express').Router();
const axios = require('axios');
const Polyline = require('@mapbox/polyline');

module.exports = router;

router.post('/', (req, res, next) => {
  let { startLoc, destLoc } = req.body
  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destLoc.latitude},${destLoc.longitude}&mode=walking&key=${process.env.GOOGLE_MAPS_KEY}`)
  .then(result=> result.data)
  .then(result=> {
    let points = Polyline.decode(result.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
              return  {
                  latitude :point[0],
                  longitude :point[1]
              }
          })
    let obj = {
      time: result.routes[0].legs[0].duration.text,
      coords
    }
    res.send(obj)
  }).catch(er=>console.log(er.message))
})
