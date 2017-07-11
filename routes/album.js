'use strict'


//Cargamos librerias
var express = require('express');
var multipart = require('connect-multiparty');

//Cargamos controlador
var AlbumController = require('../controllers/album');

//Creamos router con express
var api = express.Router();



// Creamos middleware
var md_auth = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir: './uploads/album'});


api.get('/album/', md_auth.ensureAuth , AlbumController.getAlbum);



module.exports = api;