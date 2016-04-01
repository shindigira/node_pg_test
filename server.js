var express = require('express');
var app = express();
// var handler = require('./requesthandler.js');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = 'postgres://localhost:5432/whoami';

var separation = require('./separation.js');

// options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('client'));

app.get('/data', function (req, res) {
  console.log("Get Received!");
  var client = new pg.Client(connectionString);
  separation.getUsers(req, res, client);

});

app.post('/data', function (req, res) {
  console.log("Post received!");
  if (req.body) {
    var client = new pg.Client(connectionString);
    separation.newUser(req.body.firstname, req.body.lastname, req, res, client);
  }
});


// start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server listening on port 3000!');
  var client = new pg.Client(connectionString);
  separation.tableSure(client);  // make sure table exists
});
