var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var Path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'));

app.use(bodyParser.json());

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public');
app.use(express.static(assetFolder));



app.post('/location', function(req, res){
  var expressResponse = res
  console.log('cityityity:', req.body.city);
  request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + ',us&mode=json&units=imperial&APPID=ececcfb4caeb3b2914646d9670f17dfc',
    function(err, res, body) {
      if (err) {
        console.log('Error:', err);
      }
      else {
        expressResponse.end(body);
      }
    })
});

//
// The Catch-all Route
// This is for supporting browser history pushstate.
// NOTE: Make sure this route is always LAST.
//
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
});


var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);
