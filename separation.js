function tableSure (client) {
  //// server
  // var pg = require('pg');
  // var connectionString = 'postgres://postgres@localhost:5432/whoami';
  // var connectionString = 'postgres://localhost:5432/whoami';

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var query1 = client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255))');

    var query2 = client.query('CREATE TABLE IF NOT EXISTS cars(id SERIAL PRIMARY KEY, text VARCHAR(255))');

    // var query3 = client.query("INSERT INTO users (firstname, lastname) VALUES ('Bob', 'Barley')");


    query2.on('end', function() { client.end(); });
    });
    // client.query('SELECT NOW() AS "theTime"', function(err, result) {
    //   if(err) {
    //     return console.error('error running query', err);
    //   }
    //   // console.log(result.rows[0].theTime);
    //   //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    //   var query = client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, text VARCHAR(40))');
    //   // client.end();
    // });
  // });

}

function getUsers (req, res, client) {
  var results = [];
  client.connect(function(err) {
    if(err) {
      console.error('get failed!');
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query('SELECT * FROM users');

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(results);
    });
  }); // end client.connect
}

function newUser (firstname, lastname, req, res, client) {

  client.connect(function(err) {
    if(err) {
      console.error('post failed!');
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("INSERT INTO users(firstname, lastname) values($1, $2)", [firstname, lastname]);


    query.on('end', function() {
      client.end();
      return res.status(302);
    });

  }); // end client.connect
}

module.exports = {
  tableSure: tableSure,
  getUsers: getUsers,
  newUser: newUser
};
