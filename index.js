'use strict'

//Establecemos conexion a la BBDD

var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.PORT || 3978;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/curso_mean2' , (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('La base de datos esta funcionando perfectamente');

        app.listen(port, () => {
            console.log("Servidor del api rest escuchando en http://localhost:" + port);
        });
    }
});