require('dotenv').config();
const request = require('request');
//const spotify = new Spotify(keys.spotify);

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
const spotifyThisSong = function(trackName) {

}

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


// movie-this
// do-what-it-says


// runtime
switch (process.argv[2]) {
    case 'concert-this': 
        concertThis(process.argv.slice(3).join(' '));
        break;
    case 'spotify-this-song':
        spotifyThisSong(process.argv.slice(3).join(' '));
        break;
    default:
        console.log(`No operation found for '${process.argv[2]}'.`)
        break;
}