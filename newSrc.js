// 1. firebase element: 
	// to make data the user entry persistent: project requirement
 function getArtistTrack(artist) {
    // Running an initial search to identify the artist's unique Spotify id
    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Printing the entire object to console
      console.log(response);
      // Printing the artist id from the Spotify object to console
      var artistID = response.artists.items[0].id;
      // Building a SECOND URL to query another Spotify endpoint (this one for the tracks)
      var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";
      // Running a second AJAX call to get the tracks associated with that Spotify id
      $.ajax({
        url: queryURLTracks,
        method: "GET"
      }).done(function(trackResponse) {
        // Logging the tracks
        console.log(trackResponse);
        // Building a Spotify player playing the top song associated with the artist
        // (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
        var player = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
          trackResponse.tracks[0].id +
          "' frameborder='0' allowtransparency='true'></iframe>";
        // Appending the new player into the HTML
        $("#player-div").append(player);
      });
    });
  }
  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();
    // Running the getArtistTrack (passing in the artist as an argument)
    getArtistTrack(artist);
  });
// Initialize firebase
var config = {
    apiKey: "AIzaSyBNq1JbjecyGbBMGvqIQn3lSL7vO0ZyzV8",
    authDomain: "soundtown-9d008.firebaseapp.com",
    databaseURL: "https://soundtown-9d008.firebaseio.com",
    storageBucket: "soundtown-9d008.appspot.com",
    messagingSenderId: "669604732692"
};

firebase.initializeApp(config);

var database = firebase.database();

var genreCounter = 0;
var cityCounter = 0;

$("#genre-button").on("click", function() {

genreCounter ++;

database.ref().set({
        genreCount: genreCounter
      });
    });

$("#city-button").on("click", function() {

cityCounter ++;

database.ref().set({
	cityCount: cityCounter
})
});


// // Dropdown fields/variable for storage of genre options user can search 
// var genre = [
// 	Jazz,
// 	Metal,
// 	Folk
// 	];

// // Dropdown fields for city search
// var city = [
// 	Oakland,
// 	San_Francisco,
// 	San_Jose
// 	];

// Calling input from dropdown genre menu
// $("#action").on("click", add);
// // Adding inital load to firebase

// function add (){
//          event.preventDefault();

//  var genreSearch={
//  	Jazz: $("#genre").val(),
//  }

// 2. search/sort element:
	// call api's 
	//function comparing user entry genere with sound cloud id genre 
	// if  ==== then true
	// function comparing user entry city with sound cloud id city
	// if === then true
	// true = show === soundcloud data

// SoundCloud API for genre & city search

// var queryGenreSoundCloudURL = "https://api.soundcloud.com/tracks?client_id=" + genre + "/tracks.genre"
// var queryCitySoundCloudURL = "https://api.soundcloud.com/tracks?client_id=" + city + "/tracks.city"


// // Ajax call for soundcloud api
// $.ajax({
// 	url: queryGenreSoundCloudURL,
// 	method: "GET"
// })

//    .done(function(response){
//    		console.log(response);
// 		// $("#testGenreButtonDropdown")response.html(genre);

//    });





// 3. display selected tile element:
	// display on click form/image which includes api to soundcloud artist id picture id songid and songkick venue id for specific artist from 
	// append request to songkick api with html id that displays soundcloud html id displaying artist
	// this included embed soundcould code and soundkick
