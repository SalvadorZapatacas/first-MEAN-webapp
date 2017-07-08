'use strict'

//Cargamos mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creamos la ""tabla""
var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

// Exportamos el modelo, Artist se pluraliza y se transforma en Artists en la coleccion

module.exports = mongoose.model('Artist', ArtistSchema);