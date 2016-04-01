// PostgresQL database Setup
// Official Documentation: https://github.com/brianc/node-postgres/wiki/pg
// Guide: http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/

var pg = require('pg');

var connectionString = 'postgres://postgres@localhost:5432/whoami';

var client = new pg.Client(connectionString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  // client.query('SELECT NOW() AS "theTime"', function(err, result) {
  //   if(err) {
  //     return console.error('error running query', err);
  //   }
    // console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    // var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
    // client.end();
  });
});
