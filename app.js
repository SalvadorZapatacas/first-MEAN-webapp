'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cargar rutas

var user_routes = require('./routes/user');


//Configuramos BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Configuramos cabeceras http


//rutas base
app.use('/api', user_routes);

module.exports = app;