// require the restify library.
//var restify = require('restify')  // do not use restify now
// use express for rest api - follow: 
// http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/
var express = require('express');
var app = express();

var binder = require('./lib/data_source_binder');
var generator = require('./lib/random_data_generator');

app.get('/', function(req, res) {
    res.send('Return JSON or HTML View');
});

// endpoint for testing random data generator
app.get('/test/:type', function(req, res) {

   // print out the request
   console.log(req.params);
   // print out parameter
   console.log(generator(req.params.type));

   res.send(String(generator(req.params.type)));
   res.end();
});

// endpoint for testing random data key binder
// url: http://localhost:3001/bind?obj=objname&property=proname&type=typename
app.get('/bind', function(req, res) {

   // print out the request
   console.log(req.params);
   console.log(req.query);
   var obj = req.query.obj;
   var property = req.query.property;
   var type = req.query.type;

   res.send(String(binder(obj, property, type)));
   res.end();
});

app.listen(3001);
console.log('Listening on port 3001...');
