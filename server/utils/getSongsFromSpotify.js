const db = require('../db/models');
var SpotifyWebApi = require('spotify-web-api-node');
const { User } = db.models;

const getSongsFromSpotify = (bar) => {
    return new Promise((resolve) => {
        //check if bar has an owner
        if (!bar.owner || !bar.owner.spotifyAccessToken) {
            return resolve(bar);
        }

        //set auth details
        let spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENTID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        });

        spotifyApi.setAccessToken(bar.owner.spotifyAccessToken);
        spotifyApi.setRefreshToken(bar.owner.spotifyRefreshToken);

        spotifyApi.getMyRecentlyPlayedTracks()
            .then(data => {
                bar.currentSong = data.body.items[0].track.name;
                return resolve(bar);
            })

            .catch(err => {
                //check to see if its a webapierror
                if (err.name !== 'WebapiError') resolve(bar);

                else {
                    spotifyApi.refreshAccessToken()
                        .then(function (data) {
                            spotifyApi.setAccessToken(data.body['access_token']);
                            return User.findById(bar.owner.id)
                                .then(user => {
                                    user.spotifyAccessToken = data.body['access_token']
                                    user.save();
                                })
                                .then(() => {
                                    //get songs with new accesstoken
                                    spotifyApi.getMyRecentlyPlayedTracks()
                                        .then(data => {
                                            bar.currentSong = data.body.items[0].track.name;
                                            return resolve(bar);
                                        })
                                })
                        })

                        .catch(err => {
                            console.log('spotify', err)
                        })
                }
            })

    })
}

module.exports = getSongsFromSpotify;
