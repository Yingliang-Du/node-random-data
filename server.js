// require the restify library.
//var restify = require('restify')  // do not use restify now
// use express for rest api - follow: 
// http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/
var express = require('express');
var app = express();

var data = require('./lib/data_source');
var generator = require('./lib/random_data_generator');

app.get('/', function(req, res) {
    res.send('Return JSON or HTML View');
});

app.get('/test/:type', function(req, res) {

   // print out the request
   console.log(req.params);
   // print out data
   //console.log(data.random_bind);
   console.log(generator(req.params.type));

   res.send(String(generator(req.params.type)));
   res.end();
});

app.listen(3001);
console.log('Listening on port 3001...');
