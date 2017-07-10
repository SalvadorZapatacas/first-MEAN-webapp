'use strict'


//Cargamos librerias
var express = require('express');

//Cargamos controlador
var ArtistController = require('../controllers/artist');

//Creamos router con express
var api = express.Router();



// Creamos middleware autenticación
var md_auth = require('../middlewares/authenticated');


api.get('/artist', md_auth.ensureAuth , ArtistController.getArtist);
api.post('/artist', md_auth.ensureAuth , ArtistController.saveArtist);



module.exports = api;