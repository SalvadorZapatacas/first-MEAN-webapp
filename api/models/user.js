'use strict'

//Cargamos mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creamos la ""tabla""
var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

// Exportamos el modelo, User se pluraliza y se transforma en Users en la coleccion

module.exports = mongoose.model('User', UserSchema);