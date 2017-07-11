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


api.get('/song/:id', md_auth.ensureAuth , SongController.getSong);
api.post('/song', md_auth.ensureAuth , SongController.saveSong);
api.get('/songs/:album?', md_auth.ensureAuth , SongController.getSongs);
api.put('/song/:id', md_auth.ensureAuth , SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth , SongController.deleteSong);


module.exports = api;