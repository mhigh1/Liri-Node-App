# Welcome to LIRI
Language Interpretation and Recognition Interface (LIRI) is a node.js command-line application.

### What does LIRI do? ###
LIRI allows you to search for events by artist/band, song details on Spotify, and movie details on OMDB.

### Before You Begin ###
Before you begin using LIRI, you will need to complete the following tasks:
1. Install NPM Modules
```
install npm
```
1. Setup an account to use the [Spotify API] (https://developer.spotify.com/dashboard/login) 
1. Setup an account to use the [OMDB API] (http://www.omdbapi.com/)
1. Create a .env file to store your keys
```
# Spotify API keys
SPOTIFY_ID=your-spotify-client-id
SPOTIFY_SECRET=your-spotify-secret

# OMDB API keys
OMDB_KEY=your-omdb-key
```

### Search for Events by Artist or Band ###
```
node liri.js concert-this <string>
```
![Demo of concert-this](https://github.com/mhigh1/Liri-Node-App/images/concert-this.gif)

### Search for song details on Spotify ###
```
node liri.js spotify-this-song <string>
```
![Demo of spotify-this-song](#)

### Search for movie details on OMDB ###
```
node liri.js movie-this <string>
```
![Demo of movie-this](#)

### Execute commands in a file ###
```
node liri.js do-what-it-says
```
![Demo of do-what-it-says](#)