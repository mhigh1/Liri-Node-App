// Load node.js modules
require('dotenv').config();
const fs = require('fs');
const request = require('request');
const Spotify = require('node-spotify-api');

// Load api keys
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);

// Query the BandsInTown API for an Artist and return Events
const concertThis = function(artist) {
    const bitApiUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    
    // if an artist is provided, search for events
    if(artist) {
        request(bitApiUrl, function(error, response, body) { 
            if(error) {
                return console.log(`ERROR: Failed to call API endpoint at '${error.host}:${error.port}', resultCode: ${error.code}`);
            }
            // Parse the body into a JSON object
            const results = JSON.parse(body);
            console.log('====================');
            // For each event returned display the venue, city, and region|country (when outside the United States)
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
        console.log(`ERROR: No artist specified. Please provide an artist name to search for events.`);
    }
}

// Query Spotify API by Track and return details
const spotifyThisSong = function(trackName) {
    
    const searchSpotify = function(options) {
        spotify.search(options, function(error, data) {
            if (error) {
                return console.log(`ERROR: Failed to call API endpoint at '${error.error.host}:${error.error.port}', resultCode: ${error.error.code}`);
            }
            const tracks = data.tracks.items;
            tracks.forEach(track => {
                
                const artistNames = [];
                track.artists.forEach(artist => {
                    artistNames.push(artist.name);
                });
                
                let previewUrl = '';
                if(track.preview_url) {
                    previewUrl = track.preview_url;
                } else {
                    previewUrl = 'Not Available';
                };

                console.log('====================');
                console.log('Album:', track.album.name);
                console.log('Track:', track.name);
                console.log('Artist(s):', artistNames.join(', '));
                console.log('Preview:', previewUrl);
                console.log('====================');
            });
        });
    }

    // if trackName was provided query for upto 5 matches else return a default. 
    if(trackName) {
        let options = {
            type: "track",
            query: trackName,
            limit: 5
        }
        searchSpotify(options);
    } else {
        let options = {
            type: "track",
            query: "What's My Age Again",
            limit: 1
        }
        console.log(`You didn't specify a song title, so check out this one...`);
        searchSpotify(options);
    }
}

// Query the OMDB API for movie title and display the result
const movieThis = function(movieTitle) {
    const omdbApiUrl = encodeURI(`https://www.omdbapi.com/?apikey=${keys.omdb}&t=${movieTitle}`);
    request(omdbApiUrl, function(error, response, body) {
        if(error) {
            return console.log(`ERROR: Failed to call API endpoint at '${error.host}:${error.port}', resultCode: ${error.code}`);
        } else {
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
        }
    });
}

// Execute the query from a file
const doWhatItSays = function(filePath) {
    fs.readFile(filePath, 'utf8', function(error, data) {
        if(error) {
            return console.log('error:', error);
        }

        const content = data.split(',');    // split the data from the file into an array
        const command = content[0].trim();  // trim the whitespace from command (el:0)
        const param = content[1].trim();    // trim the whitespace from value (el:1)

        // execute a function based on the command 
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
                console.log(`No operation found for '${command}'.`)
        }        
    });
}

// RUNTIME
const command = process.argv[2];

// Combine all the arguments from position 3 onward into a single string
const value = process.argv.slice(3).join(' ');

// Execute the corresponding function based on the command entered
switch (command) {
    case 'concert-this': 
        concertThis(value);
        break;
    case 'spotify-this-song':
        spotifyThisSong(value);
        break;
    case 'movie-this':
        movieThis(value);
        break;
    case 'do-what-it-says':
        doWhatItSays('./random.txt');
        break;
    default:
        console.log(`No operation found for '${command}'.`)
}