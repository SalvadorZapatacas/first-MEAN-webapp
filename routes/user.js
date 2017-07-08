'use strict'

//Cargamos express
var express = require('express');

//Cargamos controlador
var UserController = require('../controllers/user');


// Creamos un router para las rutas
var api = express.Router();

api.get('/pruebas', UserController.pruebas);
api.post('/register', UserController.saveUser);



//Exportamos la api para que sirva en todo el backend
module.exports = api;