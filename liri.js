require('dotenv').config();
const fs = require('fs');
const request = require('request');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);

// concert-this
const concertThis = function(artist) {
    const bitApiUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    
    if(artist) {
        request(bitApiUrl, function(error, response, body) { 
            if(error) {
            return console.log('error:', error); // print the error if one occurs.
            }
            const results = JSON.parse(body);
            console.log('====================');
            results.forEach(event => {
                if(event.venue.country === "United States") {
                    console.log(`${event.venue.name} (${event.venue.city}, ${event.venue.region})`);
                } else {
                    console.log(`${event.venue.name} (${event.venue.city}, ${event.venue.country})`);
                }
            });
            console.log('====================');
        });
    } else {
        console.log('Please provide an artist.');
    }
}

// spotify-this-song
// TO-DO: add condition is no trackName is provided
const spotifyThisSong = function(trackName) {
    if(trackName) {
    spotify.search({ type: 'track', query: trackName, limit: 5 }, function(error, data) {
        if (error) {
          return console.log('Error: ' + error);
        }
        const tracks = data.tracks.items;
        tracks.forEach(track => {
            console.log('====================');
            console.log('Album:', track.album.name);
            console.log('Track:', track.name);
            
            // foreach artist
            track.artists.forEach(artist => {
                console.log('Artist:', artist.name);
            });

            console.log('Preview:', track.preview_url);
            console.log('====================');
        });
      });
    } else {
        console.log("What's My Age Again by blink-182");
    }
}

// movie-this
const movieThis = function(movieTitle) {
    const omdbApiUrl = encodeURI(`https://www.omdbapi.com/?apikey=8acace67&t=${movieTitle}`);
    request(omdbApiUrl, function(error, response, body) {
        result = JSON.parse(body);
        console.log('====================');
        console.log('Title:', result.Title);
        console.log('Released:', result.Year);
        console.log('IMDB Rating:', result.imdbRating);
        console.log('Rotten Tomatoes:', result.Ratings.find(el => el.Source === "Rotten Tomatoes").Value);
        console.log('Country:', result.Country);
        console.log('Language:', result.Language);
        console.log('Actors:', result.Actors);
        console.log('Plot:', result.Plot);
        console.log('====================');
    });
}

// do-what-it-says
const doWhatItSays = function(filePath) {
    fs.readFile(filePath, 'utf8', function(error, data) {
        if(error) {
            return console.log('error:', error);
        }

        const content = data.split(',');
        const command = content[0].trim();
        const param = content[1].trim();

        switch (command) {
            case 'concert-this': 
                concertThis(param);
                break;
            case 'spotify-this-song':
                spotifyThisSong(param);
                break;
            case 'movie-this':
                movieThis(param);
                break;
            default:
                console.log(`No operation found for '${process.argv[2]}'.`)
                break;
        }        
    });
}


// runtime
switch (process.argv[2]) {
    case 'concert-this': 
        concertThis(process.argv.slice(3).join(' '));
        break;
    case 'spotify-this-song':
        spotifyThisSong(process.argv.slice(3).join(' '));
        break;
    case 'movie-this':
        movieThis(process.argv.slice(3).join(' '));
        break;
    case 'do-what-it-says':
        doWhatItSays('./random.txt');
        break;
    default:
        console.log(`No operation found for '${process.argv[2]}'.`)
        break;
}