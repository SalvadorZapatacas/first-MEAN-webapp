'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cargar rutas


//Configuramos BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Configuramos cabeceras http


//rutas base


module.exports = app;