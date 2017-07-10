'use strict'


var path = require('path');
var fs = require('fs');

//Cargamos modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


//Métodos

function getArtist(req, res){
    res.status(200).send({message : 'Método getArtist del controlador Artist.js'});
}




module.exports = {
    getArtist
};
