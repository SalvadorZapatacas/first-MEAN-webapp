'use strict'

//Cargamos mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creamos la ""tabla""
var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'Album'}
});


module.exports = mongoose.model('Song', SongSchema);