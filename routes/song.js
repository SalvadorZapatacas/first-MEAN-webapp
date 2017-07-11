'use strict'


//Cargamos librerias
var express = require('express');
var multipart = require('connect-multiparty');

//Cargamos controlador
var SongController = require('../controllers/song');

//Creamos router con express
var api = express.Router();



// Creamos middleware
var md_auth = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir: './uploads/songs'});


api.get('/song', md_auth.ensureAuth , SongController.getSong);
api.post('/song', md_auth.ensureAuth , SongController.saveSong);


module.exports = api;