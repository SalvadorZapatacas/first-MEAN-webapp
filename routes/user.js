'use strict'

//Cargamos express
var express = require('express');

//Cargamos controlador
var UserController = require('../controllers/user');


// Creamos un router para las rutas
var api = express.Router();

//Cargamos el Middleware
var md_auth = require('../middlewares/authenticated');


//Cargamos multiparty para subir ficheros
var multipart = require('connect-multiparty');
//Creamos middleware con el multipart y le indicamos la ruta de subida
var md_upload = multipart({ uploadDir: './uploads/users'});




api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth ,UserController.updateUser);
api.post('/upload-image-user/:id', [md_upload, md_auth.ensureAuth] ,UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);




//Exportamos la api para que sirva en todo el backend
module.exports = api;