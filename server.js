// require the restify library.
//var restify = require('restify')  // do not use restify now
// use express for rest api - follow: 
// http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/
var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});
app.listen(3001);
console.log('Listening on port 3001...');
