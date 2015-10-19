var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var Path = require('path');
var bodyParser = require('body-parser');

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'));

app.use(bodyParser.json());

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public');
app.use(express.static(assetFolder));


app.post('/location', function(req, res){
  console.log('city:', req.body.city);
  res.end();
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
