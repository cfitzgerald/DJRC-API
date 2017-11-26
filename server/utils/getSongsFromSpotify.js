const db = require('../db/models');
var SpotifyWebApi = require('spotify-web-api-node');
const { User, Song } = db.models;


const getSongs = (data, bar) => {
    if (!data) return bar;
    const songs = [];
    console.log(data.body.items[0]);
    data.body.items.forEach(song => {
        const track = {};
        track.artist = song.track.artists[0].name;
        track.song = song.track.name;
        songs.push(track);
        Song.findOne({
            where: {
                track: track.song,
                userId: bar.owner.id
            }
        })
            .then(song => {
                if (song) return;
                Song.create({
                    artist: track.artist,
                    track: track.song,
                    userId: bar.owner.id
                })
            })
    })
    bar.songs = songs;
    return bar;
}

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
                resolve(getSongs(data, bar));
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
                                            resolve(getSongs(data, bar));
                                        })
                                        .catch(err => {
                                            console.log(err);
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
