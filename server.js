//Imports Requires
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tarea3');
require('./models/ArticleModel');

var app = express();
var routes = require('./routes');

app.use(bodyParser.json()); 
app.use(routes);

var server = app.listen(3000, () => {
    console.log(`Listening on port: ${server.address().port}`)
})

