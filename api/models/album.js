'use strict'

//Cargamos mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creamos la ""tabla""
var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,

    // Guarda el Id de otro objeto de la BBDD
    artist: { type: Schema.ObjectId, ref: 'Artist'}
});

// Exportamos el modelo, User se pluraliza y se transforma en Users en la coleccion

module.exports = mongoose.model('Album', AlbumSchema);