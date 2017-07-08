'use strict'

//Cargamos express
var express = require('express');

//Cargamos controlador
var UserController = require('../controllers/user');


// Creamos un router para las rutas
var api = express.Router();

//Cargamos el Middleware
var md_auth = require('../middlewares/authenticated');


api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth ,UserController.updateUser);



//Exportamos la api para que sirva en todo el backend
module.exports = api;