'use strict'


var path = require('path');
var fs = require('fs');

//Cargamos esta libreria para paginar
var mongoosePaginate = require('mongoose-pagination');


//Cargamos modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


function getSong(req , res){
    res.status(200).send({message : 'getSong'});
}





module.exports = {
    getSong
}